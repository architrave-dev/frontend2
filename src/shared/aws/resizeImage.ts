import Pica from "pica";

export async function resizeImage(file: File, targetSizeKB: number): Promise<Blob> {
  const pica = Pica();

  // 이미지 로드
  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;

    // 보안상의 이유로 crossorigin 속성 설정
    img.crossOrigin = 'Anonymous';

    // 파일을 Data URL로 변환하여 이미지 소스로 설정
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // 초기 해상도와 압축 품질 설정
  let scale = 1;
  let quality = 1;
  let blob: Blob;
  let lowerScale = 0;
  let upperScale = 1;

  // 반복문을 통해 파일 크기가 목표 크기에 근접하도록 조정
  for (let i = 0; i < 10; i++) {
    const targetWidth = Math.round(img.naturalWidth * scale);
    const targetHeight = Math.round(img.naturalHeight * scale);

    // 캔버스 생성
    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    // pica를 사용하여 리사이즈
    await pica.resize(img, canvas);

    // 리사이즈된 이미지를 Blob으로 변환 (압축 품질 설정 가능)
    blob = await pica.toBlob(canvas, file.type, quality);

    const sizeKB = blob.size / 1024;

    if (Math.abs(sizeKB - targetSizeKB) < 10) {// 목표 크기에 근접하면 종료
      break;
    }
    if (sizeKB > targetSizeKB) {// 파일 크기가 너무 크면 스케일을 줄임
      upperScale = scale;
      scale = (scale + lowerScale) / 2;
    } else {  // 파일 크기가 너무 작으면 스케일을 늘림
      lowerScale = scale;
      scale = (scale + upperScale) / 2;
    }
  }

  return blob!;
}