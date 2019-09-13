const Router = window.ReactRouterDOM.BrowserRouter;
const Route = window.ReactRouterDOM.Route;
const NavLink = window.ReactRouterDOM.NavLink;
const Link = window.ReactRouterDOM.NavLink;
const useState = window.React.useState;
const useEffect  = window.React.useEffect;

const useFetch = url => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, []);

  return {loading,data};
};

function App() {
  const [nav, setNav] = useState(false);
  const classEvent = (match, location) => {
    (location.pathname === '/') ? setNav(true) : setNav(false)
  }
  useEffect(() => {
    const config = {
        // How long Waves effect duration 
        // when it's clicked (in milliseconds)
        duration: 700,

        // Delay showing Waves effect on touch
        // and hide the effect if user scrolls
        // (0 to disable delay) (in milliseconds)
        delay: 100
    };
    Waves.init(config);
    Waves.attach('.btn', ['waves-block', 'waves-float']);
    Waves.attach('.boxes-rounded', ['waves-block', 'waves-float']);
  });

  return (
    <Router basename='/ftunesa'>
      <nav className={"navbar navbar-default animated fadeIn " + (nav ? 'navbar-fixed-top navbar-off' : '')}>
        <div className="container">
          <div className="navbar-header">
            <button data-target="#modalNavigation" data-toggle="modal" aria-expanded="false" className="navbar-toggle collapsed" type="button">
              <span className="sr-only">
                Toggle navigation
              </span>
              <span className="icon-bar">
              </span>
              <span className="icon-bar">
              </span>
              <span className="icon-bar">
              </span>
            </button>
            <a className="navbar-brand" href="https://www.unesa.ac.id" target="_blank">
              <img alt="Unesa Logo" className="img-responsive" src="dist/images/logo.png"/>
            </a>
          </div>
          <div className="collapse navbar-collapse" id="navbar-collapse">
            <ul className={"nav navbar-nav navbar-right " + (nav ? 'navbar-virtual' : '')}>
              <li>
                <NavLink className={nav ? 'active' : ''} isActive={classEvent} exact={true} to="/">Home</NavLink>
              </li>
              <li>
                <NavLink activeClassName={"active"} to="/panorama">Panorama</NavLink>
              </li>
              <li>
                <NavLink activeClassName={"active"} to="/department">Department</NavLink>
              </li>
              <li>
                <NavLink activeClassName={"active"} to="/guide">Guide</NavLink>
              </li>
              <li>
                <NavLink activeClassName={"active"} to="/stats_poll">Stats & Poll</NavLink>
              </li>
              <li>
                <NavLink activeClassName={"active"} to="/about">About</NavLink>
              </li>
            </ul>

          </div>
        </div>
      </nav>
      <div className='modal modal-fullscreen-menu' id='modalNavigation' role='dialog' tabIndex="-1">
        <button type='button' aria-label='Close' className='close' data-dismiss='modal'>
          <span className='sr-only'>Close navigation</span>
          <span className='glyphicon glyphicon-remove'></span>
        </button>
        <div className='modal-dialog'>
          <nav className='list-group'>
            <a className='list-group-item' href='/'>Home</a>
            <a className='list-group-item' href='/panorama'>Panorama</a>
            <a className='list-group-item' href='/department'>Department</a>
            <a className='list-group-item' href='/guide'>Guide</a>
            <a className='list-group-item' href='/stats_poll'>Stats & Poll</a>
            <a className='list-group-item' href='/about'>About</a>
          </nav>
        </div>
      </div>
      <div id="app">
        <Route exact path="/" component={Home} />
        <Route path="/panorama" component={Panorama} />
        <Route path="/department" component={Department} />
        <Route path="/guide" component={Guide} />
        <Route path="/stats_poll" component={StatsPoll} />
        <Route path="/about" component={About} />
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div>
      <img className="wrapper animated fadeIn" src="dist/images/bg.png" alt="Backgorund"/>
      <div className="jumbotron">
          <div className="container">
              <div className="row">
                  <div className="col-md-12 col-sm-8 col-sm-push-0 col-xs-8 col-xs-push-2 text-center">
                      <h1 className="text-left animated fadeInDownBig">
                          Virtual Tour
                      </h1>
                      <h2 className="text-left animated fadeInLeftBig">
                          Engineering Faculty of <strong>UNESA</strong>
                      </h2>
                  </div>
                  <div className="clearfix"></div>
                  <div className="col-md-3 col-sm-4 col-sm-push-0 col-xs-8 col-xs-push-2">
                      <div className="boxes-rounded boxes-colored animated zoomInDown">
                          <a href="vtour/tour.html" role="button">
                              <img className="img-responsive center-block" src="dist/images/play.png" style={{width: '100px'}} alt="Play"/>
                              <h2 className="text-center" style={{color: '#fff'}}>
                                  PLAY
                              </h2>
                          </a>
                      </div>
                  </div>
                  <div className="col-md-3 col-sm-4 col-sm-push-0 col-xs-8 col-xs-push-2">
                      <div className="boxes-rounded animated zoomInDown">
                          <Link to="/guide" className="text-muted">
                              <img className="img-responsive center-block" src="dist/images/360.png" style={{width: '120px'}} alt="Play"/>
                              <h4 className="text-center" style={{paddingTop: '10%'}}>
                                  See Guide
                              </h4>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  );
}

function Panorama() {
  const pano = useFetch("dist/data/pano.json");
  const planet = useFetch("dist/data/planet.json");
  const slug = url => url.substring(0, url.length - 19);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Thumbs Section */}
        <h2 className="text-center"><strong>Informatics Engineering - Preview</strong></h2>
        <hr/>
        <div id="data-pano">
          {pano.loading ? <div className="text-center">Loading...</div> :
          pano.data.map((item, key) => (
            <div key={key} className="col-md-4 col-sm-6 col-sm-offset-0 col-xs-10 col-xs-offset-1 gutter-zero">
              <a href={"vtour/tour.html?startscene=scene_" + slug(item.url)} className="hovereffect animated fadeIn">
                <img className="img-responsive" src={"vtour/panos/" + item.url} alt={item.title}/>
                <div className="overlay">
                    <h2>{item.title}</h2>
                </div>
              </a>
            </div>
          ))}
        </div>
        <div className="clearfix"></div>    
        <hr/>
        {/* End Section */}

        {/* Thumbs Section */}
        <h2 className="text-center"><strong>Informatics Engineering - Tiny Planet</strong></h2>
        <hr/>
          <div id="data-planet">
            {planet.loading ? <div className="text-center">Loading...</div> :
            planet.data.map((item, key) => (
              <div key={key} className="col-md-4 col-sm-6 col-sm-offset-0 col-xs-10 col-xs-offset-1 gutter-zero">
                <a href={"vtour/tour.html?startscene=scene_" + item.url} className="hovereffect animated fadeIn">
                  <img className="img-responsive" src={"dist/images/planet/" + item.name} alt={item.title}/>
                  <div className="overlay">
                      <h2>{item.title}</h2>
                  </div>
                </a>
              </div>
            ))}
          </div>
          <div className="clearfix"></div>    
        <hr/>
        {/* End Section */}
      </div>
    </div>
  );
}

function Department() {
  return (
    <div className="container text-center course  animated fadeIn">
      <div className="row">
        <h1><strong>Department of Informatics Engineering</strong></h1>
        <br/>
        <br/>
        <div className="col-md-3 col-sm-6 col-sm-push-0 col-xs-8 col-xs-push-2">
          <div className="thumbnail">
            <h3 className="title">Computer Network Laboratory</h3>
            <img className="icon-course img-responsive" src="dist/images/course/jarkom.png" alt="icon"/>
            <div className="caption">
                  <a href="vtour/tour.html?startscene=scene_Lab_Jaringan_Komputer" className="btn btn-primary" role="button">Visit</a> 
              </div>
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-sm-push-0 col-xs-8 col-xs-push-2">
          <div className="thumbnail">
            <h3 className="title">Multimedia <br/>Laboratory</h3>
            <img className="icon-course img-responsive" src="dist/images/course/mm.png" alt="icon"/>
            <div className="caption">
                  <a href="vtour/tour.html?startscene=scene_Lab_Multimedia" className="btn btn-primary" role="button">Visit</a> 
              </div>        
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-sm-push-0 col-xs-8 col-xs-push-2">
          <div className="thumbnail">
            <h3 className="title">Software Engineer Laboratory</h3>
            <img className="icon-course img-responsive" src="dist/images/course/rpl.png" alt="icon"/>
            <div className="caption">
                  <a href="vtour/tour.html?startscene=scene_A7_Lab_RPL" className="btn btn-primary" role="button">Visit</a> 
              </div>        
          </div>
        </div>
        <div className="col-md-3 col-sm-6 col-sm-push-0 col-xs-8 col-xs-push-2">
          <div className="thumbnail">
            <h3 className="title">System Information Laboratory</h3>
            <img className="icon-course img-responsive" src="dist/images/course/si.png" alt="icon"/>
            <div className="caption">
                  <a href="vtour/tour.html?startscene=scene_Lab_Sistem_Informasi" className="btn btn-primary" role="button">Visit</a> 
              </div>        
          </div>
        </div>
      </div>
    </div>
  );
}

function Guide() {
  return (
    <div className="container guide  animated fadeIn">
        <div className="row">
            <div className="col-md-4 col-sm-4 col-xs-4 text-center">
                <a href="#tutorial">
                    <i className="fa fa-bookmark-o fa-5x">
                    </i>
                </a>
                <a href="#tutorial">
                    <h4>
                        How to use?
                    </h4>
                </a>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4 text-center">
                <a href="#browser">
                    <i className="fa fa-chrome fa-5x">
                    </i>
                </a>
                <a href="#browser">
                    <h4>
                        Browser Support
                    </h4>
                </a>
            </div>
            <div className="col-md-4 col-sm-4 col-xs-4 text-center">
                <a href="#setting">
                    <i className="fa fa-gear fa-5x">
                    </i>
                </a>
                <a href="#setting">
                    <h4>
                        Configuration
                    </h4>
                </a>
            </div>
            <div className="clearfix"></div>
            <div className="col-md-12" id="tutorial">
                <h2 className="text-left">
                    <strong>
                        How to use?
                    </strong>
                </h2>
                <ul style={{listStyleType: 'none', paddingTop: '10px'}}>
                    <li>
                        <ol>
                            <li>
                                Open the homepage by clicking "Home" menu or click 
                                <a className="btn-link" href="/">
                                    here
                                </a>
                            </li>
                            <li>
                                Click "PLAY" button, <a href="vtour/tour.html"><img style={{maxWidth: '100px'}} src="dist/images/play_guide.png" alt="Play"/></a>
                            </li>
                            <li>
                                Then you will automatically redirected to homepage of Virtual Tour
                            </li>
                        </ol>
                    </li>
                    <li style={{paddingTop: '20px', paddingBottom: '20px'}}>
                        Note* If you're unable to access virtual tour, then please go to configuration section <a className="btn-link" href="#setting">here</a>. Virtual tour make use of html5 engine as viewer by default, so the user should be able to access virtual tour even without flash being enabled. But, to be able to experience the feature of virtual tour entirely, flash is still needed. To enable flash on virtual tour then you need to do this step:
                    </li>
                    <li>
                        <ol>
                            <li>
                                Click on "View site information" icon (example in chrome browser), arrow 1 <img className="img-responsive" src="dist/images/settings/flash_1.png" alt="Site information"/>
                            </li>
                            <li>Then clik "Site settings", arrow 2.</li>
                            <li>
                                After that you will be redirected to "Site settings" page, <img className="img-responsive" src="dist/images/settings/flash_2.png" alt="Flash setting"/> at the "Flash" part choose "Ask (default)" to "Allow".
                            </li>
                            <li>
                                Lastly go back to virtual tour tab and you will see an alert like this and then click on "Reload".<img className="img-responsive" src="dist/images/settings/flash_3.png" alt="Site information"/>
                            </li>
                        </ol>
                    </li>
                    <li style={{paddingTop: '20px', paddingBottom: '20px'}}>
                        Note* If you see a black screen when opening virtual tour, please try to disable adblock and other similar extension in your browser.
                    </li>
                </ul>
            </div>
            <div className="col-md-12" id="browser">
                <h2 className="text-left">
                    <strong>
                        Browser Support
                    </strong>
                </h2>
                <h4>
                    To find out the browser version:
                </h4>
                <span>
                    <strong>
                        Google Chrome
                    </strong>
                </span>
                <ol>
                    <li>
                        Click on setting menu in chrome browser, at the right top corner
                        <img className="img-responsive" src="dist/images/settings/chrome_set.png" alt="Setting"/>
                    </li>
                    <li>
                        Then choose "Help" and click on "About Google Chrome"
                        <img className="img-responsive" style={{paddingTop: '10px', display: 'inline-block'}} src="dist/images/settings/chrome_set_about.png" alt="Setting"/>
                    </li>
                </ol>
                <span>
                    <strong>
                        Mozilla Firefox
                    </strong>
                </span>
                <ol>
                    <li>
                        Click on setting menu in chrome browser, at the right top corner
                        <img className="img-responsive" src="dist/images/settings/firefox_set.png" alt="Setting"/>
                    </li>
                    <li>
                        Then choose "Help" and click on "About Mozilla Firefox"
                        <img className="img-responsive" style={{paddingTop: '10px', display: 'inline-block'}} src="dist/images/settings/firefox_set_help.png" alt="Setting"/>
                        <img className="img-responsive" style={{paddingTop: '10px', display: 'inline-block'}} src="dist/images/settings/firefox_set_about.png" alt="Setting"/>
                    </li>
                </ol>            
                <h4>
                    List of supported browser version
                </h4>
                <ol>
                    <li>
                        Google Chrome (Windows, Mac, Linux) version 20 above
                    </li>
                    <li>
                        Mozilla Firefox (Windows, Mac, Linux) version 10 above
                    </li>
                    <li>
                        Microsoft Internet Explorer (Windows 7, Windows 8, Windows RT, Windows Phone 8) version 10 above
                    </li>
                    <li>
                        Desktop Safari (Windows and Mac), version 5.1 or above recommended
                    </li>
                    <li>
                        Mobile Safari in iOS device (iPhone, iPad, iPod Touch), version 5.1 or above recommended
                    </li>
                    <li>
                        Android Default Browsers, Android OS version 4.0 or above recommended
                    </li>
                </ol>
            </div>
            <div className="col-md-12" id="setting">
                <h2 className="text-left">
                    <strong>
                        Configuration
                    </strong>
                </h2>
                <h3>
                    For Google Chrome user
                    <img width="50px" src="dist/images/settings/chrome.png" alt="Chrome"/>
                </h3>
                <ol>
                    <li>
                        Make sure you already have adobe flash player installed in your computer or download
                        <a className="btn-link" href="https://get.adobe.com/flashplayer/">
                            here
                        </a>
                    </li>
                    <li>
                        If you already have latest Google Chrome, then you might not needed to install flash or download latest chrome 
                        <a className="btn-link" href="https://www.google.com/chrome/">
                            here
                        </a>
                    </li>
                </ol>
                <h3>
                    For Mozilla Firefox user
                    <img width="42px" src="dist/images/settings/firefox.png" alt="Firefox"/>
                </h3>
                <ol>
                    <li>
                        Make sure you already have adobe flash player installed in your computer or download
                        <a className="btn-link" href="https://get.adobe.com/flashplayer/">
                            here
                        </a>
                    </li>
                    <li>
                        If you already have latest Mozilla Firefox, then you might not needed to install flash or download latest Mozilla Firefox 
                        <a className="btn-link" href="https://www.mozilla.org/en-US/firefox/new/">
                            here
                        </a>
                    </li>
                </ol>
            </div>
        </div>
    </div>
  );
}

function StatsPoll() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "//www.powr.io/powr.js?external-type=html";
    script.async = true;

    document.getElementById('poll').appendChild(script);
  });
  return (
    <div id="poll">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="powr-hit-counter" id="e61ab8e0_1523934091"></div>
          </div>
          <div className="col-md-6">
            <div className="powr-poll" id="98841c8c_1523937085"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 col-md-offset-2 animated fadeIn">
          <div className="embed-responsive embed-responsive-16by9">
            <iframe src="https://www.youtube.com/embed/VlXFf2o9LBY?rel=0" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
        </div>
      </div>
      <div className="row" style={{paddingTop: '5%', paddingBottom: '5%'}}>
        <div className="col-md-8 col-md-offset-2 animated fadeIn">
          <h3>About Virtual Tour, Engineering Faculty of Unesa</h3>
          <p>Last updates of images on October 31, 2017</p>
        </div>
      </div>
      <div className="row" style={{paddingTop: '5%', paddingBottom: '5%'}}>
        <div className="col-md-4 col-md-offset-2 animated fadeIn">
          <img className="img-responsive img-rounded center-block" src="dist/images/wachid_350x450.png" alt="Wachid Mudi Waluyo" style={{height: '200px'}}/>
        </div>
        <div className="col-md-4 col-md-offset-0 col-sm-offset-3 col-xs-offset-2 animated fadeIn">

          <h3>About Developer</h3>
          <ul className="list-unstyled">
            <li><h4>Name: Wachid Mudi Waluyo</h4></li>
            <li><h4>NIM: 13050974073</h4></li>
            <li><h4>Department: Informatics Engineering</h4></li>
            <li><h4>Program: Education of Information Technology</h4></li>
            <li><h4>Unversity: State University of Surabaya</h4></li>
            <li><h4>Supervisor: Setya Chendra Wibawa</h4></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App/>,document.getElementById('root'));
