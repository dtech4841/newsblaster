import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
    // document.title = `${this.tofirstcapital(props.category)}- NewsBlaster`;
 const [articles, setArticles] = useState([]);
 const [loading, setLoading] = useState(true);
 const [page, setPage] = useState(1);
 const [totalResults, setTotalResults] = useState(0);

 const tofirstcapital=(word) =>{
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    const updateNews = async()=> {
        props.changeProgress(5);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        let parseData = await data.json();
        props.changeProgress(30);
        setArticles(parseData.articles);
        setTotalResults(parseData.totalResults);
        setLoading(false);
        
        props.changeProgress(100);
    }

    useEffect(()=>{
        updateNews();
    },[])
   

    const prevHandler = async () => {
        
        setPage(page-1);
        updateNews();

    }
  const  nextHandler = async () => {
        
        setPage(page+1);
        updateNews();
    }
   const fetchMoreData = async () => {
        props.changeProgress(10);
        setPage(page+1);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json();
        setArticles(articles.concat(parseData.articles));
        setTotalResults(parseData.totalResults);
        props.changeProgress(100);
    };

        return (
            <>
                    <h1 className='text-center my-4 text-uppercase'>NewsBlaster - Top {tofirstcapital(props.category)} Headline</h1>
                    {loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={articles.length}
                        next={fetchMoreData}
                        hasMore={articles.length !== totalResults}
                        loader={<Spinner />}
                    >
                  <div className="container mt-4">
                    <div className="row">

                        {articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} publishDate={element.publishedAt} source={element.source.name} />

                            </div>
                        })}


                  
                    </div>
                    </div>
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between">
                        <button className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.prevHandler}> &larr; Previous</button>

                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / props.pageSize)} className="btn btn-primary" onClick={this.nextHandler}>Next &rarr; </button>
                    </div> */}

                


            </>
        )
    }



News.defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 3
}
News.propsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}


export default News