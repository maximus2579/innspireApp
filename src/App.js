import {Route, BrowserRouter as Router} from "react-router-dom"
import Home from "./pages/Home"
import subHome from "./pages/subHome"

function App() {
  return (
      <Router>
          <div className="app">
              {/*routing*/}
              <switch>
              <Route path={"/"} exact component={Home}/>
              <Route path={"/home"} component={subHome}/>
              </switch>
          </div>
      </Router>
  );
}

// App.defaultProps = {
//     titles: [
//         ["people",
//             // [
//                 // "peopleTest1",
//                 // "peopleTest2",
//                 // "peopleTest3",
//                 // "peopleTest4",
//             // ]
//         ],
//         ["devOps",
//             // [
//                 // "devOpsTest1",
//                 // "devOpsTest2",
//                 // "devOpsTest3",
//                 // "devOpsTest4",
//             // ]
//         ],
//         ["agenda",
//             // [
//                 // "agendaTest1",
//                 // "agendaTest2",
//                 // "agendaTest3",
//                 // "agendaTest4",
//             // ]
//         ],
//         ["agile",
//             // [
//                 // "agileTest1",
//                 // "agileTest2",
//                 // "agileTest3",
//                 // "agileTest4",
//             // ]
//         ],
//     ]
// }

export default App;
