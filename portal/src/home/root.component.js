import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

// Type 1 import
const RemoteNavFromNext = React.lazy(() => import("app1/nav"));

// Type 2 import
// const RemoteNavFromNext = (import("app1/nav"));

// Type 3 import
// let RemoteNavFromNext = null;
// (async function () {
//   const AllNext1 = await import('app1/nav')
//   console.log(AllNext1);
//   debugger;
// })();
// console.log(RemoteNavFromNext);


const AnimationExample = () => {

  const [ showButton, setShowButton ] = React.useState(false);

  return <div>
    
    {/* <div>
      Load a lazy button from App3 Module
      <input type="button" value="Show/hide imported button" onClick={() => setShowButton(!showButton)} />
      {showButton && 
      <React.Suspense fallback="Loading Button">
        <RemoteButton />
      </React.Suspense>
      }
    </div> */}

    <div>
      Load a lazy Comp from NextJS Module
      <input type="button" value="Show/hide imported button" onClick={() => setShowButton(!showButton)} />
      {showButton && 
      <React.Suspense fallback="Loading Button">
        <RemoteNavFromNext />
      </React.Suspense>
      }
      {/* <RemoteNavFromNext /> */}

    </div>

    
    <Router basename="/home">
    <Route
      render={({ location }) => (
        <div style={{position: 'relative', height: '100%'}}>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/hsl/10/90/50" />}
          />
          <ul style={styles.nav}>
            <NavLink to="/hsl/10/90/50">Red</NavLink>
            <NavLink to="/hsl/120/100/40">Green</NavLink>
            <NavLink to="/rgb/33/150/243">Blue</NavLink>
            <NavLink to="/rgb/240/98/146">Pink</NavLink>
          </ul>

          <div style={styles.content}>
            <Switch location={location}>
              <Route exact path="/hsl/:h/:s/:l" component={HSL} />
              <Route exact path="/rgb/:r/:g/:b" component={RGB} />
              {/* Without this `Route`, we would get errors during
                the initial transition from `/` to `/hsl/10/90/50`
              */}
              <Route render={() => <div>Not Found</div>} />
            </Switch>
          </div>
        </div>
      )}
    />
  </Router>
  </div>
}

const NavLink = props => (
  <li style={styles.navItem}>
    <Link {...props} style={{ color: "inherit" }} />
  </li>
);
const HSL = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.hsl,
      background: `hsl(${params.h}, ${params.s}%, ${params.l}%)`
    }}
  >
    hsl({params.h}, {params.s}%, {params.l}%)
  </div>
);
const RGB = ({ match: { params } }) => (
  <div
    style={{
      ...styles.fill,
      ...styles.rgb,
      background: `rgb(${params.r}, ${params.g}, ${params.b})`
    }}
  >
    rgb({params.r}, {params.g}, {params.b})
  </div>
);
const styles = {};
styles.fill = {
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0
};
styles.content = {
  ...styles.fill,
  top: "40px",
  textAlign: "center"
};
styles.nav = {
  padding: 0,
  margin: 0,
  position: "absolute",
  top: 0,
  height: "40px",
  width: "100%",
  display: "flex"
};
styles.navItem = {
  textAlign: "center",
  flex: 1,
  listStyleType: "none",
  padding: "10px"
};
styles.hsl = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};
styles.rgb = {
  ...styles.fill,
  color: "white",
  paddingTop: "20px",
  fontSize: "30px"
};
export default AnimationExample;