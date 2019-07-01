state = {
    data: [],
    page: 1,
    loading: true,
    error: null
  };

componentDidMount(){
    this.getAllbeers()
}

async getAllbeers(){
  try {
    console.log(787987);
    const {page} = this.state;
    const beers = await db.collection('beers');
    const query = await beers.where(
      'style.category.name',
      '==',
      'Irish Origin Ales'
    ).limit(10);
    let arr = [];
    query.get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        let beer = doc.data();
        arr.push(beer);
      });
    });
    console.log(arr);
  } catch (err) {
    console.log(err);
  }
};
