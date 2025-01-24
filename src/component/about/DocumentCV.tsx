import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font, PDFDownloadLink } from '@react-pdf/renderer';
import { convertS3UrlToCloudFrontUrl } from '../../shared/aws/s3Upload';
import { CareerType } from '../../shared/enum/EnumRepository';
import { CareerData, MemberInfoData } from '../../shared/dto/EntityRepository';

// Register Pretendard font
Font.register({
  family: 'Pretendard-SemiBold',  // Between Regular and Bold
  src: 'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-SemiBold.woff'
});

Font.register({
  family: 'Pretendard-Medium',  // Between Regular and Light
  src: 'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Medium.woff'
});

Font.register({
  family: 'Pretendard',
  src: 'https://cdn.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff'
});

interface DocumentCVProps {
  memberInfo: MemberInfoData;
  careerList: CareerData[];
}

const DocumentCV: React.FC<DocumentCVProps> = ({ memberInfo, careerList }) => {

  const getCareerTitle = (type: CareerType): string => {
    const titles: Record<CareerType, string> = {
      [CareerType.EDU]: 'Education',
      [CareerType.S_EXH]: 'Solo Exhibition',
      [CareerType.G_EXH]: 'Group Exhibition',
      [CareerType.PRZ]: 'Prize',
      [CareerType.PRS]: 'Press',
      [CareerType.RSD]: 'Residency',
      [CareerType.RPS]: 'Representation',
      [CareerType.TCH]: 'Teach',
      [CareerType.PBL]: 'Publication',
      [CareerType.COL]: 'Collections'
    };
    return titles[type];
  };

  return (
    <Document>
      <Page size="A4" style={PDFStyles.Page.root}>
        <View style={PDFStyles.Section.root}>
          <View style={PDFStyles.Section.profileAndInfo}>
            <Image
              source={convertS3UrlToCloudFrontUrl(memberInfo.uploadFile?.originUrl)}
              style={PDFStyles.Image.profile}
              cache={true}
            />
            <View style={PDFStyles.Section.infoContainer}>
              <Text style={PDFStyles.Text.name}>{memberInfo.name}</Text>
              <View style={PDFStyles.Section.infoRow}>
                <Text style={PDFStyles.Text.label}>Born:</Text>
                <Text style={PDFStyles.Text.value}>{memberInfo.year}</Text>
              </View>
              <View style={PDFStyles.Section.infoRow}>
                <Text style={PDFStyles.Text.label}>Country:</Text>
                <Text style={PDFStyles.Text.value}>{memberInfo.country}</Text>
              </View>
              <View style={PDFStyles.Section.infoRow}>
                <Text style={PDFStyles.Text.label}>Email:</Text>
                <Text style={PDFStyles.Text.value}>{memberInfo.email}</Text>
              </View>
              <View style={PDFStyles.Section.infoRow}>
                <Text style={PDFStyles.Text.label}>Contact:</Text>
                <Text style={PDFStyles.Text.value}>{memberInfo.contact}</Text>
              </View>
            </View>
          </View>

          <View style={PDFStyles.Section.description}>
            <Text style={PDFStyles.Text.description}>{memberInfo.description}</Text>
          </View>

          {careerList && (
            <View style={PDFStyles.Section.careerContainer}>
              {Object.values(CareerType).map((type) => {
                const careers = careerList.filter(career => career.careerType === type);
                if (careers.length === 0) return null;
                return (
                  <View key={type} style={PDFStyles.Section.careerSection}>
                    <Text style={PDFStyles.Text.careerTitle}>
                      {getCareerTitle(type)}
                    </Text>
                    {careers.map((career, index) => (
                      <View key={index} style={PDFStyles.Section.careerItem}>
                        <Text style={PDFStyles.Text.careerYear}>{career.yearFrom}</Text>
                        <Text style={PDFStyles.Text.careerContent}>{career.content}</Text>
                      </View>
                    ))}
                  </View>
                );
              })}
            </View>
          )}
        </View>
        <View style={PDFStyles.Section.informationConfirm}>
          <Text style={PDFStyles.Text.informationConfirm} render={() => "I confirm that all the information provided above is accurate to the best of my knowledge."} />
        </View>
        <View style={PDFStyles.Section.pageNumber}>
          <Text style={PDFStyles.Text.pageNumber} render={() => '- 1 -'} />
        </View>
      </Page>
    </Document>
  );
}

// PDF Typography system
const PDFTypography = {
  H1: {
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
  },
  MemberInfoLabel: {
    fontSize: 9,
    fontFamily: 'Pretendard',
  },
  MemberInfoBody: {
    fontSize: 9,
    fontFamily: 'Pretendard',
  },
  CareerTitle: {
    fontSize: 10,
    fontFamily: 'Pretendard-Medium',
  },
  CareerBody: {
    fontSize: 9,
    fontFamily: 'Pretendard',
  },
  PageNumber: {
    fontSize: 7,
    fontFamily: 'Pretendard',
  },
  InformationConfirm: {
    fontSize: 7,
    fontFamily: 'Pretendard',
    color: 'lightgray',
  }
};

const PDFStyles = {
  Page: StyleSheet.create({
    root: {
      paddingTop: 50,
      paddingBottom: 50,
      paddingLeft: 35,
      paddingRight: 35,
      backgroundColor: '#ffffff',
      fontFamily: 'Pretendard',
    }
  }),

  Section: StyleSheet.create({
    root: {
      flexGrow: 1,
    },
    profileAndInfo: {
      flexDirection: 'row',
      marginBottom: 18,
      alignItems: 'flex-end',
    },
    infoContainer: {
      marginLeft: 20,
      flex: 1,
    },
    infoRow: {
      flexDirection: 'row',
      marginBottom: 3,
    },
    description: {
      width: '60%',
    },
    careerContainer: {
      marginTop: 24,
    },
    careerSection: {
      marginBottom: 20,
    },
    careerItem: {
      flexDirection: 'row',
      marginBottom: 4,
    },
    informationConfirm: {
      position: 'absolute',
      bottom: 50,
      right: 30,
      textAlign: 'right',
    },
    pageNumber: {
      position: 'absolute',
      bottom: 30,
      left: 0,
      right: 1,
      textAlign: 'center',
    },
  }),

  Image: StyleSheet.create({
    profile: {
      width: 75,
      height: 100,
      objectFit: 'cover',
      borderWidth: 0.5,
      borderColor: '#000',
      borderStyle: 'solid',
    }
  }),

  Text: StyleSheet.create({
    name: {
      ...PDFTypography.H1,
      marginBottom: 10,
    },
    label: {
      ...PDFTypography.MemberInfoLabel,
      width: 60,
    },
    value: {
      ...PDFTypography.MemberInfoBody,
    },
    description: {
      ...PDFTypography.MemberInfoBody,
      lineHeight: 1.3,
    },
    careerTitle: {
      ...PDFTypography.CareerTitle,
      width: 80,
      marginBottom: 7,
      borderBottomWidth: 0.5,
      borderBottomColor: '#000',
      borderBottomStyle: 'solid',
    },
    careerYear: {
      ...PDFTypography.CareerBody,
      width: 80,
    },
    careerContent: {
      ...PDFTypography.CareerBody,
      flex: 1,
    },
    pageNumber: {
      ...PDFTypography.PageNumber,
    },
    informationConfirm: {
      ...PDFTypography.InformationConfirm,
    },
  }),
};

export default DocumentCV;