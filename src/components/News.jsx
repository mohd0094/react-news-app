import React, { Component } from 'react'
import NewsItesm from './NewsItesm'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
// import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {

  static defaultProps = {
    country: 'in',
    pageSize: 20,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - News App`;
  }



  async updatedNaws() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f20fcd8c7561452a930efbb7740557f3&page${this.state.page}=&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    this.updatedNaws();
  }

  handlePrviousClick = async () => {
    //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f20fcd8c7561452a930efbb7740557f3&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading: true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json();
    this.setState({ page: this.state.page - 1 })
    this.updatedNaws();
  }

  handleNextClick = async () => {
    // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))) {
    //   let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f20fcd8c7561452a930efbb7740557f3&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //   this.setState({loading: true});
    // let data = await fetch(url);
    // let parsedData = await data.json();
    this.setState({ page: this.state.page + 1 })
    this.updatedNaws();
  }

  fetchMoreData = async () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
   
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=f20fcd8c7561452a930efbb7740557f3&page${this.state.page}=&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page + 1 })
    let data = await fetch(url);
    let parsedData = await data.json();

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })


  }

  render() {

    return (
      <>
        <div className='container py-5'>

          <div className='row'>
            <div className='col-6 mt-5'>
              <button type='button' disabled={this.state.page <= 1} className='btn btn-outline-primary' onClick={this.handlePrviousClick}>Prvious</button>
            </div>  <div className='col-6 mt-5 d-flex justify-content-end '>
              <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type='button' className='btn btn-outline-success' onClick={this.handleNextClick}>Next</button>
            </div>

            <div className='col-12'>
              <h2 className='text-uppercase text-center text-white mt-5'>News {this.props.category} </h2>
            </div>

          </div>
          {this.state.loading && <Spinner/>}


          {/* when the click Next prev button after spinner show {!this.state.loading && this.state.articles.map((e) => { */}
          {/* <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          > */}
            <div className='row mb-5'>
            {!this.state.loading && this.state.articles.map((e,i) => {
                return (
                  <div className='col-lg-3 col-md-6 mt-5' key={i} >
                    {
                      <NewsItesm h100="h-100"
                        title={e.title ? e.title.slice(0, 60) + "..." : "Hi there no title this article. sory for the enconince"}
                        description={e.description ? e.description.slice(0, 100) + "..." : "Hi there no title this description. sory for the enconince"}
                        imgUrl={!e.urlToImage ? "https://www.reuters.com/resizer/1gKqmmSDud116d5ZJaQQIKFPeqw=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/KNSGEFVWHZKYVIT3ZIWDHTXMOM.jpg" : e.urlToImage}
                        newsUrl={e.url}
                        date={e.publishedAt}
                        author={e.author ? e.author : "Unknown"}
                        sourceName={e.source.name}
                      ></NewsItesm>
                    }
                  </div>
                )
              })

              }
            </div>
          {/* </InfiniteScroll> */}



        </div>
      </>
    )
  }
}

export default News


