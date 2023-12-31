import "../App.css"
import React, { isValidElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useRef } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice.js";
import { Typography } from "@mui/material";

const Profile = () => {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const dispatch = useDispatch();

  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({});

  const [image, setImage] = useState(undefined);

  const [imageparcent, setImageparcent] = useState(0);

  const [imageError, setImageError] = useState(false);

  const [updatesuccess,setupdatesuccess] = useState(false)


  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageparcent(Math.round(progress));
        // console.log("Upload is " + progress + "% done");
      },

      //  console.log(image)
      (error) => {
        setImageError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePicture: downloadURL })
        );
      }
    );
  };

  

  //* Visibility of the user profile image upload instruction

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // console.log(currentUser);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  console.log(formData)


  const handleSubmit = async(e) =>{

    e.preventDefault();

    try {
      
      dispatch(updateUserStart())

      //! Remember to add the id 


      const res = await fetch (`/api/user/update/${currentUser._id}`, {
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData)
      })

      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data))
        return;
      }

      dispatch(updateUserSuccess(data))
      setupdatesuccess(true)

    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  }


  const handleDeleteAccount = async() =>{
     try {
      dispatch(deleteUserStart())

      const res=  await fetch(`/api/user/delete/${currentUser._id}`, {

        method:'DELETE',
      })

      const data = await res.json();

      if(data.success === false){
        dispatch(deleteUserFailure(data))
        return;
      }

      dispatch(deleteUserSuccess(data))
     } catch (error) {
      dispatch(deleteUserFailure(error))
     }
  }

  const handleSignOut = async() =>{

    try {
      await fetch('/api/auth/signout')
      dispatch(signOut())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <Typography fontSize={"3rem"} textAlign={"center"} fontWeight={600} >Page Under Build </Typography>
    </>
    
  );
};

export default Profile;


{/* <div className="card  ">
//       <div className="flex flex-col items-center  p-14  sm:justify-center sm:pt-0 bg-white h-screen">

//         <div className="flex">
//           <div className="flex justify-between gap-x-20">
//             <div>
//               <Link to="/profile">
//                 <h3 className="text-3xl font-bold text-purple-600 mb-4 text-center">
//                   Profile
//                 </h3>
//               </Link>
//             </div>

//             <div>
//              <input */}
//                 type="file"
//                 ref={fileRef}
//                 hidden
//                 accept="image/*"
//                 onChange={(e) => setImage(e.target.files[0])}
//               />
//               <img
//                 className=" rounded-full object-cover cursor-pointer w-15 h-16 bottom-2 relative"
//                 src={formData.profilePicture || currentUser.profilePicture}
//                 alt="profilepic"
//                 onClick={() => fileRef.current.click()}
//               />

//               {isVisible && (
//                 <div
//                   className="flex items-center bg-blue-500 text-white text-xs font-bold px-1 py-1 mt-1"
//                   role="alert"
//                 >
//                   <svg
//                     className="fill-current w-4 h-4 mr-2"
//                     xmlns="http://www.w3.org/2000/svg"
//                     viewBox="0 0 20 20"
//                   >
//                     <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
//                   </svg>
//                   <p className="text-sx">Upload your image by click on profile image</p>
//                 </div>
//               )}

//               {/* //* Image uploading UI and logic */}
//               <p className="text-sm self-center text-center">
//                 {imageError ? (
//                   <span className="text-red-700">
//                     Error uploading image (file size must be less than 5 MB)
//                   </span>
//                 ) : imageparcent > 0 && imageparcent < 100 ? (
//                   <span className="text-slate-700">{`Uploading: ${imageparcent} %`}</span>
//                 ) : imageparcent === 100 ? (
//                   <span className="text-green-700">
//                     Image uploaded successfully
//                   </span>
//                 ) : (
//                   ""
//                 )}
//               </p>
//             </div>

            
//           </div>
//         </div>

//         <div className="w-full  mt-4  px-6 py-4   bg-white shadow-md sm:max-w-lg sm:rounded-lg ">
//           <form onSubmit={handleSubmit}>
//             <div className="mt-4">
//               <label
//                 htmlFor="name"
//                 className="block text-sm font-medium text-gray-700 undefined"
//               >
//                 Name
//               </label>
//               <div className="flex flex-col items-start">
//                 <input
//                   type="name"
//                   id="name"
//                   name="name"
//                   defaultValue={currentUser.name}
//                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="mt-4">
//               <label
//                 htmlFor="username"
//                 className="block text-sm font-medium text-gray-700 undefined"
//               >
//                 Username
//               </label>
//               <div className="flex flex-col items-start">
//                 <input
//                   defaultValue={currentUser.username}
//                   type="username"
//                   id="username"
//                   name="username"
//                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>
//             {/* //*  Email */}

//             <div className="mt-4">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700 undefined"
//               >
//                 Email
//               </label>
//               <div className="flex flex-col items-start">
//                 <input
//                   defaultValue={currentUser.email}
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             {/* //* password */}

//             <div className="mt-4">
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700 undefined"
//               >
//                 Password
//               </label>
//               <div className="flex flex-col items-start">
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//                   onChange={handleChange}
//                 />
//               </div>
//             </div>

//             <div className="flex items-center mt-4">
//               <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">

//                 {loading ? 'Loading...' : 'Update'}
//               </button>
//             </div>
//             <p className="text-center text-red-600 mt-4">
//               {error && 'Something Went Wrong'}
//           </p>
//           <p className="text-center text-green-600 mt-4">
//               {updatesuccess && 'User updated successfully'}
//           </p>
//           </form>

//           {/* <div className="mt-4 text-grey-600">
//           Dont have an account?{" "}
//           <span>
//             <Link to="/signup" className="text-purple-600 hover:underline">
//               Sign Up
//             </Link>
//           </span>
//         </div> */}
//           <div className="flex justify-center w-full my-4 flex-col">
//             <hr className="w-full" />
//             <hr className="w-full" />
//             <div className="flex justify-between mt-5">
//               <span onClick={handleDeleteAccount} className="text-red-700 cursor-pointer">
//                 Delete Account
//               </span>
//               <span onClick={handleSignOut}className="text-red-700 cursor-pointer">Sign out</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>