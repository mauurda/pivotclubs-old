import React from "react";
import {Redirect} from 'react-router-dom';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";

const useStyles = makeStyles(styles);
const clientId = '926016643840-5pkgp3lkcmjeieff55q01jqg3bbpm92n.apps.googleusercontent.com'
const appId = '503099390580607'

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  // eslint-disable-next-line
  const [userEmail, setUserEmail] = React.useState();
  // eslint-disable-next-line
  const [userName, setUserName] = React.useState('TestName');
  // eslint-disable-next-line
  const [userImg, setUserImg] = React.useState();
  // eslint-disable-next-line
  const [userGoogleId,setUserGoogleId] = React.useState();
  // eslint-disable-next-line
  const [userFbId,setUserFbId] = React.useState();
  // eslint-disable-next-line
  const [loggedIn,setLoggedIn] = React.useState(0);
  const[redirectLocation,setRedirectLocation] = React.useState();
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  
  const checkUser =(userEmail)=>{
    let url = `https://apivotsports.herokuapp.com/clubusers?uemail=`;
    url = url.concat(userEmail);
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        let entries= json;
        if (entries.length >= 1){
          setRedirectLocation("/admin/dashboard");
        }else{
          setRedirectLocation("/admin/wizard")
        }
        
      })
      
  }

  const classes = useStyles();

  const onSignIn=(googleUser)=> {
    let profile = googleUser.getBasicProfile();
    setUserEmail(profile.getEmail());
    setUserName(profile.getName());
    setUserImg(profile.getImageUrl());
    setUserGoogleId(profile.getEmail());
    setLoggedIn(1);
    checkUser(profile.getEmail());
  }
  
  const responseGoogle = (response) => {
    console.log(response);
    setRedirectLocation("/admin/dashboard");
    
  }

  const responseFacebook = (response) => {
    console.log(response);
  }

  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                <FacebookLogin
                        appId={appId}
                        callback={responseFacebook}
                        render={renderProps => (
                          <Button color="white" simple onClick={renderProps.onClick}><i className={" fab fa-facebook"} /></Button>
                        )}
                      />
                      <GoogleLogin
                        clientId={clientId}
                        render={renderProps => (
                          <Button color="white" simple onClick={renderProps.onClick} disabled={renderProps.disabled}>
                            <i className={" fab fa-google"} />
                        </Button>
                        )}
                        buttonText="Login"
                        onSuccess={onSignIn}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                        />
                </div>
              </CardHeader>
              <CardBody>
                <CustomInput
                  labelText="First Name.."
                  id="firstname"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button color="rose" simple size="lg" block>
                  Let{"'"}s Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
      {redirectLocation ? <Redirect to={{
            pathname: redirectLocation,
            state: {
              userName: userName,
              userEmail: userEmail,
              userImg: userImg
           }
        }}></Redirect> : ""}
    </div>
  );
}
