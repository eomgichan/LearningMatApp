import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Screens/Login'
import FindId from './Screens/FindId'
import FindPassword from './Screens/FindPassword'
import Signup from './Screens/Signup'
import Main from './Screens/Main'

const Stack = createStackNavigator();

 export default function App() {
   return (
     <NavigationContainer>
       <Stack.Navigator initialRouteName='Login'>
         <Stack.Screen name = "Login" component = {Login}/>
         <Stack.Screen name = "FindId" component = {FindId}/>
         <Stack.Screen name = "FindPassword" component = {FindPassword}/>
         <Stack.Screen name = "Signup" component = {Signup}/>
         <Stack.Screen name = "Main" component = {Main}/>
       </Stack.Navigator>
     </NavigationContainer>
   );
 }