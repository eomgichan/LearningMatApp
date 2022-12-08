import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import {useState} from 'react';
import {db} from '../firebaseConfig'
import {
    addDoc, collection, getDocs,
     doc, updateDoc, where, query} from "firebase/firestore";

const Authentication = (props) => {
    const [Flag,setFlag] = useState(true);
    const [Name, setName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [ClassNumber, setClassNumber] = useState("");
    const [TeacherInfo, setTeacherInfo] = useState();

    const readfromDB = async() => {
        try{
            const data = await getDocs(collection(db, "Teacher Information"))

            setTeacherInfo(data.docs.map(doc=>(
                {...doc.data(), id: doc.id}
                )))
        } catch(error) {
            console.log(error.message)
        }
    }
    const changeName = (event) => {
        setName(event)
    }  
    const changePhoneNumber = (event) => {
        setPhoneNumber(event)
    }
    const changeClassNumber = (event) => {
        setClassNumber(event)
    }
    if (Flag) {
        readfromDB()
        setFlag(false)
    }

    const TeacherAuthentication = async () => {
        let basicinfo = false
        TeacherInfo?.map((item) => {
            if (item.Teachername == Name &&
                item.ClassNumber == ClassNumber &&
                item.PhoneNumber == PhoneNumber) {
                    basicinfo = true
                    props.navigation.navigate("Signup")
                }
        })
        if (!basicinfo) {
            alert("You are not teacher in our school")
        }
    }
    return (
        <View>
            <Text>Enter your name</Text>
            <TextInput
                value = {Name}
                onChangeText = {changeName}
            />
            <Text>Enter your phonenumber</Text>
            <TextInput
                value = {PhoneNumber}
                onChangeText = {changePhoneNumber}
            />
            <Text>Enter your classnumber</Text>
            <TextInput
                value = {ClassNumber}
                onChangeText = {changeClassNumber}
            />
            <TouchableOpacity
                title = "Authentication"
                onPress={TeacherAuthentication}
            />
        </View>
    );
}

export default Authentication