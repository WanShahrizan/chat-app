const { useState, useEffect } = require("react");
const SignUp = require("./signup");
const Chat = require("./chat");
const supabase = require("../utils/supabase");

function App() {
  const [session, setSession] = useState(null);
  useEffect(function () {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange(function (event, supaSession) {
      setSession(supaSession);
    });
  }, []);
  console.log(session);

  function handleLogOut() {
    supabase.auth.signOut().then(function () {
      console.log("You are sign out!");
    });
  }

  let markup = <SignUp />;
  if (session) {
    console.clear();
    console.log(session.user.email);

    //If you are logged in(meaning there is a section)
    markup = (
      <div>
        <h2>You are logged In as {session.user.email}</h2>
        <h3 onClick={handleLogOut}>Log Out</h3>
        <Chat email={session.user.email} />
      </div>
    );
  }

  return (
    <div>
      <h2>Supabase + React Chat App</h2>
      {markup}
    </div>
  );
}

module.exports = App;
