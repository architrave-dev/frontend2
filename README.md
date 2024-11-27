# Architrave Frontend Repository.

Seamless Portfolio / Archive for Artist

Architrave is a portfolio web service that empowers contemporary artists\
to directly manage their projects and works.

## Now Status
MVP-2 released.\
URL: [http://architrave-mvp1-bucket.s3-website.ap-northeast-2.amazonaws.com](http://architrave-mvp1-bucket.s3-website.ap-northeast-2.amazonaws.com)

Contact us for a test Artist ID

## User Test Result - 2
- 10 people in Art industry
- Positive feedback
  - Simple and intuitive design
  - Easy content management
  - Great synchronization of Works and Projects content
  - Looking forward to the release
  - Willing to pay for the service

- Negative feedback
	- Prefer the logo and service name to be hidden.
	- GNB should be hidden by default to highlight images.
  - Contact page is necessary, even if it duplicates "About" page.
  - Keyboard actions would be helpful.
  - Clicking edit, confirm, create, or delete buttons repeatedly is inconvenient.
  - Need a feature to view works in full size.
  - Need a feature to reorder items.
  - Public/private settings in Work's each information.
  - Drag-and-drop multiple images at once.
  - Upload with Excel, etc.
  - Option to download Career details.
  - Support for more diverse Career types.

## Key Features
### MVP-2
| Component         | Description                                                                        | CRUD                 |
|-------------------|------------------------------------------------------------------------------------|----------------------|
| Auth              | Login                                                                              | -                    |
| Billboard         | Announcement or Set the Mood                                                       | Read, Update         |
| Project           | User's Project                                                                     | Create, Read, Update, Delete |
| ProjectInfo       | Detailed project descriptions                                                      | Create, Read, Update |
| ProjectElement    | Project main content includes Work, TextBox, and Divider                           | Create, Read, Update |
| Works             | Main archieve about user's all works                                               | Create, Read, Update, Delete |
| MemberInfo        | Member's info                                                                      | Read, Update         |
| Career            | User's education, solo exhi, group exhi                                            | Create, Read, Update, Delete |

## Tech Stack
- React with TypeScript
- Styled-components
- Zustand
- Axios
- AWS S3 for deployment

[Why?](https://github.com/architrave-dev/frontend2/wiki/%EC%9D%98%EC%82%AC%EA%B2%B0%EC%A0%95-%EB%AA%A9%EB%A1%9D)

## Considerations
### MVP-2
- [Global Error Handling with Zustand](https://github.com/architrave-dev/frontend2/wiki/Global-Error-handling-with-Zustand)
- [Molecule with Headless Component](https://github.com/architrave-dev/frontend2/wiki/Atomic-Design-System)

### MVP-1
- [Headless components for flexible and Accessible](https://github.com/architrave-dev/frontend2/wiki/Headless-component-with-DI-(composition))


## Contact
| Position    | Name                       | Email                 |
|-------------|----------------------------|-----------------------|
| PM          | Kim Youngdong              | nfs82young@gmail.com  |
| Frontend    | Kim Youngdong              | nfs82young@gmail.com  |
| Backend     | Kim Youngdong              | nfs82young@gmail.com  |
| Design      | Jung Joohee                | jjh62128@gmail.com    |
| Design      | Choi Jihee                 | zhee4820@gmail.com    |


