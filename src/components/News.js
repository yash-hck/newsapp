import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  // document.title = `${this.capitalizeFirstLetter(
  //   props.category
  // )} - NewsMonk`;
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [page, setPage] = useState(1);


  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () =>  {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);

    let parseddata = await data.json();
    console.log(parseddata);
    setArticles(parseddata.articles);
    setTotalResults(parseddata.totalResults);
    setLoading(false);
    
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
  }, [])

  const fetchMoreData = async ()=> {
    //this.setState({page : this.state.page + 1});
    setPage(page + 1);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);

    let parseddata = await data.json();
    console.log(parseddata);
    setArticles(articles.concat(parseddata.articles));
    setTotalResults(parseddata.totalResults);
    
  }

  
    return (
      <>
        <h1 className="text-center my-3" style={{ margin: "35px 0px" }}>
          News Monk - {capitalizeFirstLetter(props.category)} Top
          Headlines
        </h1>

        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
          <div className="row">
            {articles.map((element) => {
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

News.defaultProps = {
  country: "in",
  pageSize: 5,
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default News