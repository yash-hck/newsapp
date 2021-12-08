import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 5,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      totalResults : 0,
      page: 1,
    };

    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonk`;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=43f0eb807d8145e9862f6a525b80f51e&page=1&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);

    let parseddata = await data.json();
    console.log(parseddata);
    if (parseddata.articles)
      this.setState({
        articles: parseddata.articles,
        totalArticles: parseddata.totalResults,
        loading: false,
      });
    else {
      console.log("parsed is null");
    }
    this.props.setProgress(100);
  }

  async componentDidMount() {
    // let url =
    //   `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=43f0eb807d8145e9862f6a525b80f51e&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);

    // let parseddata = await data.json();
    // console.log(parseddata);
    // if (parseddata.articles)
    //   this.setState({
    //     articles: parseddata.articles,
    //     totalArticles: parseddata.totalResults,
    //     loading : false
    //   });
    // else {
    //   console.log("parsed is null");
    // }

    this.updateNews();
  }

  fetchMoreData = async ()=> {
    this.setState({page : this.state.page + 1});
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=43f0eb807d8145e9862f6a525b80f51e&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);

    let parseddata = await data.json();
    console.log(parseddata);
    if (parseddata.articles)
      this.setState({
        articles: this.state.articles.concat(parseddata.articles),
        totalArticles: parseddata.totalResults,
      });
    else {
      console.log("parsed is null");
    }
  }

  render() {
    return (
      <>
        <h1 className="text-center my-3" style={{ margin: "35px 0px" }}>
          News Monk - {this.capitalizeFirstLetter(this.props.category)} Top
          Headlines
        </h1>

        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                    />
                  </div>
                );
              })}
          </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}
