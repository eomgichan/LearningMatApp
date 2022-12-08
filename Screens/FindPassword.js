import {TouchableOpacity, Text, View, TextInput} from 'react-native';
import {useState} from 'react';
import {db} from '../firebaseConfig'
import {
    addDoc, collection, getDocs,
     doc, updateDoc, where, query} from "firebase/firestore";


const FindPassword = (props) => {
    const [Flag,setFlag] = useState(true);
    const [Id, setID] = useState();
    const [Name, setName] = useState("");
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

    const changeID = (event) => {
        setID(event)
    }  

    if (Flag) {
        readfromDB()
        setFlag(false)
    }

    const findPassword = async () => {
        TeacherInfo?.map((item) => {
            if (item.Teachername == Name &&
                item.Id == Id
                ) {
                    setPassword(item.Password)
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
            <Text>Enter your ID</Text>
            <TextInput
                value = {PhoneNumber}
                onChangeText = {changeID}
            />
            <TouchableOpacity
                title = "Find"
                onPress={findPassword}
            />
            <Text>{Password}</Text>
        </View>
    );

}

export default FindPassword