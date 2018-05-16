    //Mise à jour suite à REDUX, manage via reducer
    // addIngredientHandler = (type) => {
    //     //Réinitialisation des ingredients
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCounted = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCounted;
        
    //     //Calcul du montant après ajour d'ingredient
    //     const priceAddition = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
        
    //     //Mise à jour du state
    //     this.setState({totalPrice : newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }
    
    //Mise à jour suite à REDUX,manage via reducer
    // removeIngredientHandler = (type) => {
    //     //Réinitialisation des ingredients
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return;
    //     }
    //     const updatedCounted = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCounted;
        
    //     //Recalcul du prix
    //     const priceSoustraction = INGREDIENT_PRICE[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceSoustraction;
        
    //     //Mise à jour du state
    //     this.setState({ totalPrice : newPrice, ingredients : updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // purchaseContinueHandler = () => {
    //     Mise à jour suite à REDUX
    //     const queryParams = [];
    //     for (let i in this.state.ingredients) {
    //         queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
    //     }

    //     queryParams.push('Price=' + this.state.totalPrice);
    //     const queryString = queryParams.join('&');
    //     this.props.history.push('/checkout')
    //         pathname: '/checkout',
    //         search: '?' + queryString
    //     });
    // }

    //Mise à jour suite à REDUX
    // componentDidMount () {
    //     axios.get('https://burgerbuilder-19bad.firebaseio.com/ingredients.json ')
    //     .then (response => {
    //         this.setState( { ingredients: response.data } );
    //     } )
    //     .catch(error => {
    //         this.setState( { error: true } );
    //     } );
    // }