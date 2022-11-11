import React, { useState, useEffect } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyARAl8q78r6hnXMkcvyHnIO7zUgW_A_BBo",
  authDomain: "test-6e138.firebaseapp.com",
  projectId: "test-6e138",
  storageBucket: "test-6e138.appspot.com",
  messagingSenderId: "224631053358",
  appId: "1:224631053358:web:0e088d611d047f924393bf",
  measurementId: "G-CQ05DGYD26"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const App = () => {
  const [postText, setPostText] = useState("");
  const [posts, setPosts] = useState([]);

  const savePost = async (e) => {
    e.preventDefault();
    console.log("okay");
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        Text: postText,
        createdOn: new Date().toLocaleTimeString(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }


  
  
  useEffect(() => {
    
    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));

      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());
        let newArray = [...posts, doc.data()];

        setPosts(newArray);

      });
    }
    getData();

  },[])



  return (
    <>
    <div>
      <form onSubmit={savePost}>
        <input type="text" placeholder='enter anything' onChange={(e) => {
          setPostText(e.target.value)
        }} />
        <button type='submit'> Share Post</button>
      </form>

        {
          posts.map((ele,i)=>{
            return(
            <div key={i}>
              <h2>{ele?.Text}</h2>
              <h2>{ele?.createdOn}</h2>
            </div>
            )
          })
        }


      </div>

    </>
  )
}

export default App;