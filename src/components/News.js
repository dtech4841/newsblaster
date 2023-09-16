import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
    static defaultProps = {
        country: 'in',
        category: 'general',
        pageSize: 3
    }
    static propsTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    tofirstcapital(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    }

    constructor(props) {
        super(props);
        // console.log('this is news constructor');
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults:0
        }
        document.title = `${this.tofirstcapital(this.props.category)}- NewsBlaster`;
        
    }

    async updateNews() {
        this.props.setProgress(5);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        
        let parseData = await data.json();
        this.props.setProgress(30);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false

        })
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    prevHandler = async () => {
        this.setState({ page: this.state.page - 1 });
        this.updateNews();

    }
    nextHandler = async () => {
        this.setState({ page: this.state.page + 1 });
        this.updateNews();
    }
    fetchMoreData = async () => {
        this.props.setProgress(10);
        this.setState({ page: this.state.page + 1 });
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        
        let data = await fetch(url);
        let parseData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
            

        })
        this.props.setProgress(100);
    };

    render() {
        return (
            <>
                
                    <h1 className='text-center my-4 text-uppercase'>NewsBlaster - Top {this.tofirstcapital(this.props.category)} Headline</h1>
                    {this.state.loading && <Spinner/>}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}
                    >
                  <div className="container mt-4">
                    <div className="row">

                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} publishDate={element.publishedAt} source={element.source.name} />

                            </div>
                        })}


                  
                    </div>
                    </div>
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between">
                        <button className="btn btn-primary" disabled={this.state.page <= 1} onClick={this.prevHandler}> &larr; Previous</button>

                        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-primary" onClick={this.nextHandler}>Next &rarr; </button>
                    </div> */}

                


            </>
        )
    }
}

export default News
