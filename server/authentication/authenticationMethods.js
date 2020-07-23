
const canAuthenticate = (key) => {
    // get the user logins

    if (!login || login.failedAttempts < 5) {
        return true;
    }

    const timeout = (new Date() - new Date(login.timeout).addMinutes(1));
    if (timeout >= 0) {
        // delete the user login from the login table
        return true;
    }

    return false;
}

const failedLoginAttempt = (key) => {
    // increment the number of failed logins for key in logins table
    // return key row in logins table after update
}

const successfulLoginAttempt = (key) => {
    // get the login from the logins table
    // if the login exists, remove it
}