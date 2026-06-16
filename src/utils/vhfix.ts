function vhCssVariablesRegister() {

    const injectVhToDocument = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
      document.documentElement.style.setProperty('--100vh', `${vh * 100}px`);
    }

    window.addEventListener('resize', () => {
      injectVhToDocument();
    });

    injectVhToDocument();
}

export default vhCssVariablesRegister;
