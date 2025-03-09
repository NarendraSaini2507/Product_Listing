const categoryListing = document.querySelector('#category-listing')
const productListing = document.querySelector('#product-listing')
const numberHolder  = document.querySelector('#number-holder')
const searchInp = document.querySelector('#search-inp')
const limit = 50;
let page =0;


async function getcategories(){
    const response = await fetch('https://dummyjson.com/products/categories')
    const data = await response.json();
    for(let d of data){
        const li = document.createElement('li');
        li.classList.add('shadow-sm' , 'my-2', 'p-2');
        li.innerText = d.name;

        li.addEventListener(
            'click',
            function(e){
                getProduct(d.url);
                document.querySelector('#category-listing .active').classList.remove('active');
                e.target.classList.add('active');
            }
        )

        categoryListing.append(li);
    }

}

const searchProducts = async ()=>{
    const url = `https://dummyjson.com/products/search?q=${searchInp.value}`
    const response = await fetch(url)
    const data = await response.json();
    productListing.innerHTML=''
    for(let prod of data.products){
        const col = document.createElement('div');
        col.classList.add('col-4', 'mb-2');
        col.innerHTML = `
            <div class="col-4">
                        <div class="card" style="width: 18rem;">
                            <img src="${prod.thumbnail}"
                            class="card-img-top" alt="${prod.title}">
                            <div class="card-body">
                              <h5 class="card-title"> 
                              
                              ${prod.title}</h5>
                            
                          <p class="card-text"><strong>Price:</strong>$${prod.price}</p>
                              <p class="card-text"><strong>Rating:</strong>${prod.rating}</p>
                              <a href="#" class="btn btn-primary">Add to Cart</a>
                            </div>
                          </div>
                    </div>
        `;
        productListing.append(col);
    }
}

const getProduct = async (url = 'https://dummyjson.com/products')=>{
    // let skip = limit*page;
    url +=`?skip=${limit*page}&limit=${limit}`
    
    const response = await fetch(url)
    const data = await response.json();
    productListing.innerHTML=''
    if(page==0){
        const Total_pages =Math.ceil(data.total/limit)
        numberHolder.innerHTML=''
        for(let p=0; p<Total_pages;p++){
            const li = document.createElement('li')
            li.classList.add('page-item')
            li.innerHTML=`
                <a class="page-link" href="#page=${p}">${p+1}</a>
            `;
            li.addEventListener(
                'click',
                function(){
                    page=p;
                    getProduct();
                }
            )
            numberHolder.append(li)
        }
    }
   
    
    for(let prod of data.products){
        const col = document.createElement('div');
        col.classList.add('col-4', 'mb-2');
        col.innerHTML = `
            <div class="col-4">
                        <div class="card" style="width: 18rem;">
                            <img src="${prod.thumbnail}"
                            class="card-img-top" alt="${prod.title}">
                            <div class="card-body">
                              <h5 class="card-title"> 
                              
                              ${prod.title}</h5>
                            
                              <p class="card-text"><strong>Price:</strong>$${prod.price}</p>
                              <p class="card-text"><strong>Rating:</strong>${prod.rating}</p>
                              <a href="#" class="btn btn-primary">Add to Cart</a>
                            </div>
                          </div>
                    </div>
        `;
        productListing.append(col);
    }
}

getProduct();
getcategories();