/*
  Below you will find exemplary component that does nothing until window resize.
  On window resize it:
  - asynchronously fetches window dimensions,
  - informs parent about calculated total of even indexed dimensions,
  - shows multiplied entries on the screen.

  Fix errors and improve code quality (remove or add code if needed).
  Use TypeScript.
  entries are null initially until data is fetched.

  React version 17
*/

import React from 'react';

type Props = {
  multiplier: number,
  onNewTotal: (total: number) => void,
};

type State = {
  isVisible: boolean,  
  entries: number[],
};

class MultiplierComponent extends React.Component<Props, State> {
  state: State = {
    isVisible: false,
    entries: [],
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  //ReceiveProps //Unmount
  componentWillReceiveProps(nextProps: any) {
    if (this.props.multiplier !== nextProps.multiplier) {
      this.notify(nextProps.multiplier);
    }
  }


  shouldComponentUpdate(nextProps: any, nextState: any) {
    return nextProps.multiplier !== this.props.multiplier
      || nextProps.onNewTotal !== this.props.onNewTotal
      || nextState.entries !== this.state.entries;
  }

  onResize() {
    this.setState({ isVisible: true });
    this.fetch();
  }
  
  async fetch() {
    const entries = await this.loadData();
    console.log(entries);
    this.setState( {entries: entries });
    this.notify();
  }

  loadData(): Promise<number[]> {
    return new Promise((resolve) => window.setTimeout(() => resolve([
      window.innerWidth,
      window.innerHeight,
      window.outerWidth,
      window.outerHeight,
      window.screen.width,
    ]), 1500));
  }

  notify(multiplier = this.props.multiplier) {
    console.log(this.state.entries);
    let totalEven = 0;
    this.state.entries.map((entry, index) => {
      if ((index % 2) === 0){
        totalEven += Number(entry) * Number(multiplier);
      }
      return totalEven;
    }
      
    )  
    this.props.onNewTotal(totalEven);
  }

  render() {
    const entries = this.state.entries;
    const isVisible = this.state.isVisible;

    if (isVisible === false) {
      return <div>Resize window to see make component visible!</div>;
    }

    return (
      <>
        <p>
          Multiplied entries: { this.props.multiplier }
        </p>
        <ul>
            {
              entries.map((entry,index) => (
                  <li key={String(index)}>
                    { entry * this.props.multiplier }
                  </li>
                )
                 
              
              // entries.forEach((entry) => <li>{ entry * this.props.multiplier }</li>)   
              // entries.then((entry) = () => {

              // })         
          
              )
          }
          </ul>        
        <span>Window width = { entries[0] }</span>
      </>
    );
  }
}

export default MultiplierComponent;
