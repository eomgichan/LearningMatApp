import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import {useState} from 'react';
import {db} from '../firebaseConfig'
import {
    addDoc, collection, getDocs,
     doc, updateDoc, where, query} from "firebase/firestore";


const FindId = (props) => {
    const [Flag,setFlag] = useState(true);
    const [Id, setID] = useState();
    const [Name, setName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [ClassNumber, setClassNumber] = useState("");
    const [TeacherInfo, setTeacherInfo] = useState();

    

    const readfromDB = async() => {
        try{
            const data = await getDocs(collection(db, "Teacher Infromation"))
            
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

    const findId = async () => {
        TeacherInfo?.map((item) => {
            if (item.Teachername == Name &&
                item.PhoneNumber == PhoneNumber &&
                item.ClassNumber == ClassNumber) {
                    setID(item.teacherid)
                }
        })
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
                title = "Find"
                onPress={findId}
            />
            <Text>{Id}</Text>
        </View>
    );

}

export default FindId