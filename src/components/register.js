import React, {useState} from "react";
import { auth , db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { toast } from "react-toastify";


function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");

    const handelRegister =async (e) => {
        e.preventDefault();
       try {
         await createUserWithEmailAndPassword(auth, email, password)
         const user = auth.currentUser;
         console.log(user)
         if(user){
            await setDoc(doc(db, "users", user.uid), {
                firstName: fname,
                lastName: lname,
                email: email,
                password: password,
            });
         }
         console.log("User registered successfully")
         toast.success("User registered successfully",{
            position: "top-center",
            autoClose: 2000,
         })

       } catch (error) {
           console.log(error);

           toast.error(error.message,{
            position: "bottom-center",
            autoClose: 2000,
         })
        
       }
    }

    return (
        <form onSubmit={handelRegister}>
            <h3>Sign Up</h3>

            <div className="mb-3">
                <label>First Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter First Name"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Last Name</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Last Name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Email address</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label>Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </div>
            <p className="">
                Already registered? <a href="/login">sign in</a>
            </p>

        </form>
    );

}
export default SignUp;