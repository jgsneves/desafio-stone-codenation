import React from 'react';
import './Footer.css';
import logo from './../../assets/stone-logo.svg';
import facebook_logo from './../../assets/logo-facebook.svg';
import twitter_logo from './../../assets/logo-twitter.svg';
import instagram_logo from './../../assets/logo-instagram.svg';
import youtube_logo from './../../assets/logo-youtube.svg';
import linkedin_logo from './../../assets/logo-linkedin.svg';

const FooterComponent = () => {
    return (
        <footer className="footerContainer">
            <div className="topContainer">
                <img src={logo} alt="Stone"/>

                <div className="logoContainer">
                    <a href="https://www.facebook.com/stonepagamentos/">
                        <img 
                            src={facebook_logo} 
                            alt="Logo_facebook" 
                            className="logo"
                        />
                    </a>
                    <a href="https://twitter.com/stonepagamentos">
                        <img 
                            src={twitter_logo} 
                            alt="Logo_twitter"
                            className="logo" 
                        />
                    </a>
                    <a href="https://www.instagram.com/stone/">
                        <img 
                            src={instagram_logo} 
                            alt="Logo_instagram"
                            className="logo" 
                        />
                    </a>
                    <a href="https://www.youtube.com/channel/UCk4L4JykgoDkN8YeuxkNqIQ">
                        <img 
                            src={youtube_logo} 
                            alt="Logo_youtube"
                            className="logo"
                        />
                    </a>
                    <a href="https://www.linkedin.com/company/stone-pagamentos/">
                        <img 
                            src={linkedin_logo} 
                            alt="Logo_linkedin"
                            className="logo"
                        />
                    </a>

                </div>
            </div>

            <p className="text">Rua Fidêncio Ramos, 308, Torre A, 10 andar, conjunto 102, 
                Vila Olímpia, CEP 04551-010, SP 
                CNPJ 16.501.555/0001-57
            </p>
        </footer>
    );
}

export default FooterComponent;