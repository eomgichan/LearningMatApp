import {TouchableOpacity, Text, View, TextInput, Button} from 'react-native';
import {useState} from 'react';
import {db} from '../firebaseConfig'
import {
    addDoc, collection, getDocs,
     doc, updateDoc, where, query} from "firebase/firestore";

const SignUp = (props) => {
    const [Flag,setFlag] = useState(true);
    const [Id, setID] = useState("");
    const [Password, setPassword] = useState("");
    const [TeacherInfo, setTeacherInfo] = useState();
    

    const readfromDB = async() => {
        try{
            const data = await getDocs(collection(db, "Teacher Infomation"))
            
            setTeacherInfo(data.docs.map(doc=>(
                {...doc.data(), id: doc.id}
                )))
        } catch(error) {
            console.log(error.message)
        }
    }

    const changeID = (event) => {
        setID(event)
      }
    const changePassword = (event) => {
        setPassword(event)
    }
    if (Flag) {
        readfromDB()
        setFlag(false)
    }

    const signupteacher = async () => {
        let idList = []
        TeacherInfo?.map((item) => {
            idList.push(item.teacher_id)
        })
        try {
            await addDoc(collection(db, "Teacher Information"), {
                teacher_id : Id,
                Password : Password,
            })
            alert("Sign Up Complete!")
            props.navigation.navigate("Login")
        }catch(error) {
            console.log(error.message)
        }
    }

    return (
        <View>
            <Text>enter your ID</Text>
            <TextInput
                value = {Id}
                onChangeText = {changeID}
            />
            <Text>enter your Password</Text>
            <TextInput
                value = {Password}
                onChangeText = {changePassword}
            />
            <TouchableOpacity
                title = "Sign Up"
                onPress={signupteacher}
            />
        </View>
    );
}
export default SignUp