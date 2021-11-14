import React from 'react';
import {REF_FARM_CONTRACT_ID, wallet} from "~services/near";

function App() {
  const [account, network] = wallet.getAccountId().split('.');
  return (
    <div>
      <button onClick={() => wallet.requestSignIn(REF_FARM_CONTRACT_ID)}>sign in</button>
      <button onClick={()=> wallet.signOut()}>sign out</button>
      <p>{account}</p>
    </div>
  );
}

// decorate any components with this HOC to display them as vertical-align middle
// use individual fn is needed since `h-4/5` is not a appropriate style rule for
// any components
function AutoHeight(Comp: any) {
  return (props: any) => {
    return (
      <div className="xs:flex xs:flex-col md:flex md:flex-col justify-center h-4/5 lg:mt-12 relative">
        <Comp {...props} />
      </div>
    );
  };
}

export default App;
