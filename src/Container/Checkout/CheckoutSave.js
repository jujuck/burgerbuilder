    //Mise à jour suite à REDUX
    // state = {
    //     ingredients:null,
    //     totalPrice: 0
    // }

    //Mise à jour des ingredients et prix pour affichage en page de checkout
    // componentWillMount() {
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     for (let param of query.entries()) {
    //         if (param[0] === 'Price') {
    //             price = param[1];
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         } 
    //     }
    //     this.setState({ingredients: ingredients, totalPrice: price});
    // }