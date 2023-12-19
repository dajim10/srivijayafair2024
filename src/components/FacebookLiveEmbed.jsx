import React, { useEffect } from 'react';

const FacebookLiveEmbed = () => {

  useEffect(() => {
    // Load the Facebook SDK asynchronously
    const loadFbSdk = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          xfbml: true,
          version: 'v12.0', // Use the latest version available
        });
      };

      (function (d, s, id) {
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        const js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    };

    loadFbSdk();
  }, []);

  return (
    <div className="fb-video" data-href="https://www.facebook.com/facebook/videos/286689657703468/" data-width="800" data-show-text="false">
      {/* <div className="fb-xfbml-parse-ignore"> */}
      {/* <blockquote cite="https://www.facebook.com/facebook/videos/286689657703468/">
          <a href="https://www.facebook.com/facebook/videos/286689657703468/">Facebook Live Video</a>
          <p>Check out this Facebook Live video!</p>
          Posted by <a href="https://www.facebook.com/facebook/">Facebook</a> on Wednesday, December 4, 2013
        </blockquote> */}
      {/* </div> */}
    </div>
  );
};

export default FacebookLiveEmbed;
