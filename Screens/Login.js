import {View, StyleSheet, Image,TouchableOpacity, TextInput, ImageBackground, Text} from 'react-native';
import login from '../assets/Login.png'
import {useState} from 'react';
import {db} from '../firebaseConfig'
import {
    addDoc, collection, getDocs,
     doc, updateDoc, where, query} from "firebase/firestore";
import SignUp from './SignUp'

const Login = (props) => {
    const [flag,setFlag] = useState(true);
    const [ID, setID] = useState("");
    const [password, setPassword] = useState("");
    const [teacherInfo, setTeacherInfo] = useState();
    
    const readfromDB = async() => {
        try{
            const data = await getDocs(collection(db, "teacher"))
            
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

    if (flag) {
        readfromDB()
        setFlag(false)
    }

    const login2Home =() => {
        let have = false
        teacherInfo?.map(async (item) => {
            if (item.teacher_id == ID &&
                item.password == password) {                    
                    have = true
                    let itemList = []
                    try {
                        const q = query(collection(db,"answer"), where ('teacher_id', "==", ID))
                        const data = await getDocs(q)

                        data.docs.map(doc=>(
                            itemList.push(doc.data())
                        ))
                    }catch (error) {
                        console.log(error)
                    }
                    props.navigation.navigate("Home",
                    {myClass : item.class,
                     name : item.name})
            }
        })
        if (!have) {
            alert("아이디 또는 비밀번호가 틀렸습니다.")
        }
    }
    return (
        <View>
            <View
                style ={{marginTop:130, marginLeft :300, marginRight:20, backgroundColor:'#FBFAFA', width: 390, height:300}}
            >
                <Text
                    style={{marginLeft:10, marginTop:10, fontSize:15}}
                >ID:</Text>
                <TextInput
                value = {ID}
                onChangeText = {changeID}
                //style ={{ height:50, width:'100%', padding:10}}
                style ={{marginLeft:10, width:'100%', marginTop:10}}
                />
                <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginLeft:10,
                    marginRight:10
                }}
                />
                <Text
                    style={{marginTop:30, marginLeft:10, fontSize:15}}
                >Password:</Text>
                <TextInput
                value = {password}
                onChangeText = {changePassword}
                style ={{marginLeft:10, width:'100%', marginTop:10}}
            />
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                    marginLeft:10,
                    marginRight:10
                }}
            />
            <TouchableOpacity
                onPress={()=>{
                    props.navigation.navigate("Find")
                }}>
                <Text
                    style ={{marginLeft:10, marginTop:20, fontSize:15, color : '#6E7AE5', textDecorationLine :'underline'}}
                    >forgot your password?</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={{marginTop:10}}
                    onPress={()=>{
                        props.navigation.navigate("SignUp")
                    }}>
                    <Text
                        style ={{marginLeft:10,marginTop:25, fontSize:15, color : '#6E7AE5', textDecorationLine :'underline'}}
                    >signup</Text>
                </TouchableOpacity>
                </View>
                <TouchableOpacity
                style = {{width:100}}
                onPress={login2Home}>
                    <Image
                        style={{width:390, height:50, marginLeft:300}}
                        source={login}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
        
    );
}


export default Login;