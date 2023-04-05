import React, { useEffect, useState } from 'react';
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL  } from "firebase/storage";

const UserInfo = () => {
  const [displayName, setDisplayName] = useState("");
  const [showBlockName, setShowBlockName] = useState(false);
  const [nameValue, steNameValue] = useState("");

  const [email, setEmail] = useState("");
  const [showBlockEmail, setShowBlockEmail] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const [foto, setFoto] = useState()
  const [newFoto,setNewFoto] = useState()
  
  // Ініціалізація з'єднання з Firebase Authentication, яка дає змогу  використовувати різні методи для аутентифікації користувачів
  const auth = getAuth();

  // Ініціалізація хмарного сховища
  const storage = getStorage();


  // Доступ до данних користувача на сервері
  useEffect(() => {
    const serverUserInfo = () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user !== null) {
        setDisplayName(user.displayName);
        setEmail(user.email);
        setNewFoto(user.photoURL);
        const emailVerified = user.emailVerified;
        // console.log(user);

        const uid = user.uid;
        // console.log(user.photoURL);
      }
    };
    serverUserInfo();
  }, []);


  // Редагування Імені користувача

  const valueName = (e) => {
    steNameValue(e.target.value);
  };

  const showName = () => {
    setShowBlockName(true);
  };

  const showCheckName = () => {
    updateProfile(auth.currentUser, {
      displayName: nameValue,
      // photoURL:foto,
    })
      .then(() => {
        console.log("editing was successful");
      })
      .catch((error) => {
        console.error(error);
      });
    setShowBlockName(false);
    steNameValue("");
  };

  //Редагування почти

  const valueEmail = (e) => {
    setEmailValue(e.target.value);
  };

  const showEmail = () => {
    setShowBlockEmail(true);
  };

  const showCheckEmail = () => {
    updateEmail(auth.currentUser, emailValue)
    // updateProfile(auth.currentUser, {
    //   displayName: displayName,
    // })
      .then(() => {
        console.log("editing mail was successful");
      })
      .catch((error) => {
        console.error(error);
      });
    setShowBlockEmail(false);
    setEmailValue("");
  };

   // Заміна фото
  const fotoValue = (e) => {
    setFoto(e.target.files);
  };

  const imagesRef = ref(storage, 'image');

  const uploadFile = () => {
    return uploadBytes(imagesRef, foto[0]);
  }

  const fotoChange = async () => {
    try {
      const snapshot = await uploadFile();
      const url = await getDownloadURL(imagesRef);
      const changeFotoProfile = await updateProfile(auth.currentUser, {
        photoURL: url,
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="blockUserInfo">
      <div className="userInfo">
        <div className="fotoBlock">
          <img width={50} height={50} src={newFoto} alt="avatarka" />
          <input onChange={(e) => fotoValue(e)} type="file" />
          <img
            onClick={fotoChange}
            width={25}
            height={25}
            src="./img/iconСheck.png"
            alt="iconСheck"
          />
        </div>
        <div className="displayName">
          <div className="textBlock">
            <p>
              <span>Name:</span> {displayName}
            </p>
            {showBlockName !== true && (
              <img
                onClick={showName}
                width={25}
                height={25}
                src="./img/pencil.png"
                alt="pencil"
              />
            )}
          </div>
          {showBlockName && (
            <div className="editBlock">
              <input
                value={nameValue}
                onChange={(e) => valueName(e)}
                type="text"
              />
              <img
                onClick={showCheckName}
                width={25}
                height={25}
                src="./img/iconСheck.png"
                alt="iconCheck"
              />
            </div>
          )}
        </div>
        <div className="email">
          <div className="textBlock">
            <p>
              <span>Email:</span> {email}
            </p>
            {showBlockEmail !== true && (
              <img
                onClick={showEmail}
                width={25}
                height={25}
                src="./img/pencil.png"
                alt="pencil"
              />
            )}
          </div>
          {showBlockEmail && (
            <div className="editBlock">
              <input
                value={emailValue}
                onChange={(e) => valueEmail(e)}
                type="text"
              />
              <img
                onClick={showCheckEmail}
                width={25}
                height={25}
                src="./img/iconСheck.png"
                alt="iconCheck"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;