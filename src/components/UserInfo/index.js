import React, { useEffect, useState } from 'react';
import {
  getAuth,
  updateProfile,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import styles from "./UserInfo.module.css";
import Header from '../Header';
import Footer from '../Footer';

const UserInfo = () => {
  const [displayName, setDisplayName] = useState("");
  const [showBlockName, setShowBlockName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  //===========================================NAme
  const [email, setEmail] = useState("");
  const [showBlockEmail, setShowBlockEmail] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  //===========================================Email
  const [foto, setFoto] = useState();
  const [newFoto, setNewFoto] = useState();
  const [fotoHide, setFotoHide] = useState(true);
  //===========================================Foto
  // const [pas, setPas] = useState('')
  const [showPas, setShowPas] = useState(false);
  const [pasValue, setPasValue] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // Ініціалізація з'єднання з Firebase Authentication, яка дає змогу  використовувати різні методи для аутентифікації користувачів
  const auth = getAuth();


  // Ініціалізація хмарного сховища
  const storage = getStorage();


  // Доступ до данних користувача на сервері
  useEffect(() => {
    const serverUserInfo = () => {
      const user = auth.currentUser;
      if (user !== null) {
        setDisplayName(user.displayName);
        setEmail(user.email);
        setNewFoto(user.photoURL);
      }
    };
    serverUserInfo();
  });


  // Редагування Імені користувача
  const valueName = (e) => {
    setNameValue(e.target.value);
  };

  const showName = () => {
    setShowBlockName(true);
  };

  const showCheckName = () => {
    updateProfile(auth.currentUser, {
      displayName: nameValue,
    })
      .then(() => {
        console.log("editing was successful");
        setDisplayName(nameValue);
      })
      .catch((error) => {
        console.error(error);
      });
    setShowBlockName(false);
    setNameValue("");
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
      .then(() => {
        console.log("editing mail was successful");
        setEmail(emailValue);
      })
      .catch((error) => {
        console.error(error);
      });
    setShowBlockEmail(false);
    setEmailValue("");
  };


  // Заміна фото
  const showFotoChange = () => {
    setFotoHide(false);
  };

  const fotoValue = (e) => {
    setFoto(e.target.files);
  };

  const imagesRef = ref(storage, "image");

  const uploadFile = () => {
    return uploadBytes(imagesRef, foto[0]);
  };

  const fotoChange = async () => {
    if (foto === undefined) {
      return setFotoHide(true);
    }
    setFotoHide(true);
    try {
      const snapshot = await uploadFile();
      const url = await getDownloadURL(imagesRef);
      const changeFotoProfile = await updateProfile(auth.currentUser, {
        photoURL: url,
      });
      setNewFoto(url);
    } catch (error) {
      console.error(error);
    }
  };


  // Зміна паролю
  const valuePas = (e) => {
    setPasValue(e.target.value);
  };

  const valueCurrentPas = (e) => {
    setCurrentPassword(e.target.value);
  };

  const showPass = () => {
    setShowPas(true);
  };

  const changePasword = () => {

    if (currentPassword.length === 0 || pasValue.length === 0) {
      return setShowPas(false);
    }
    const user = auth.currentUser;

    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );

    reauthenticateWithCredential(user, credential)
      .then(() => {
        updatePassword(user, pasValue)
          .then(() => {
            console.log("parol uspih");
            setShowPas(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.blockUserInfo}>
        <div className={styles.userInfo}>
          <div className={styles.fotoBlock}>
            <img
              className={styles.awatar}
              width={70}
              height={70}
              src={newFoto}
              alt="avatarka"
            />
            {fotoHide !== true && (
              <div>
                <input onChange={(e) => fotoValue(e)} type="file" />
                <img
                  onClick={fotoChange}
                  width={25}
                  height={25}
                  src="./img/iconСheck.png"
                  alt="iconСheck"
                />
              </div>
            )}

            {fotoHide && (
              <img
                onClick={showFotoChange}
                width={25}
                height={25}
                src="./img/pencil.png"
                alt="pencil"
              />
            )}
          </div>
          <div className={styles.displayName}>
            <div className={styles.textBlock}>
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
              <div className={styles.editBlock}>
                <input
                  placeholder="Name"
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
          <div className={styles.email}>
            <div className={styles.textBlock}>
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
              <div className={styles.editBlock}>
                <input
                  placeholder="Email"
                  value={emailValue}
                  onChange={(e) => valueEmail(e)}
                  type="email"
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
          <div className={styles.pasword}>
            <div className={styles.textBlock}>
              <p>
                <span>Password change:</span>
              </p>
              {showPas !== true && (
                <img
                  onClick={showPass}
                  width={25}
                  height={25}
                  src="./img/pencil.png"
                  alt="pencil"
                />
              )}
            </div>
            {showPas && (
              <>
                <div className={styles.editBlock}>
                  <input
                    type="password"
                    placeholder="Current password"
                    onChange={(e) => valueCurrentPas(e)}
                  />
                  <input
                    value={pasValue}
                    onChange={(e) => valuePas(e)}
                    type="password"
                    placeholder="New password"
                  />
                  <img
                    onClick={changePasword}
                    width={25}
                    height={25}
                    src="./img/iconСheck.png"
                    alt="iconCheck"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer className={styles.Footer} />
    </div>
  );
};

export default UserInfo;