import {useState, useEffect} from 'react';
import './App.css';
import loveHeart from './assets/gifs/love-heart.gif';
import sad from './assets/gifs/sad.gif';
import sulking from './assets/gifs/sulking.gif';
import oops from './assets/gifs/oops.gif';
import dance from './assets/gifs/dance.gif';
import image1 from './assets/images/1.jpg';
import image2 from './assets/images/2.jpg';
import image3 from './assets/images/3.jpg';
import image4 from './assets/images/4.jpg';
import image5 from './assets/images/5.jpg';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState('');
  const [noCount, setNoCount] = useState(0);
  const [yes, setYes] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [currentNav, setCurrentNav] = useState(0);
  const [openLetter, setOpenLetter] = useState(false);

  const gifs = {
    0 : loveHeart,
    1 : sulking,
    2 : sad,
    3 : oops,
  }

  const images = [image1, image2, image3, image4, image5];

  const messages = {
    0 : "Will you be my valentine?",
    1 : "Are you sure?",
    2 : "PLEASE LET ME BE YOUR VALENTINE",
    3 : "Oops! you can't refuse now."
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if(!isLoading) return;

    const interval = setInterval(() => {
      setDots((prev) => prev.length >= 3 ? '' : prev + '.');
    }, 400);

    return () => clearInterval(interval);
  }, [isLoading]);


  const Loading = () => {
    return(
      <div className='loading-screen'>
        <h1>Gathering love{dots}</h1>
      </div>
    );
  }

  const Memories = () => {
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return(
      <div className='memories'>
        <h1>Memories</h1>
        <div className='image-container'>
          {images.map((url, index) => <img key={index} src={url} style={{animation: `float ${getRandomInt(5, 10)}s ease infinite alternate`}}/>)}
        </div>
      </div>
    );
  }

const Letter = () => {
  const [password, setPassword] = useState('');

  return(
    <>
    <div className={`letter ${!openLetter && 'blurred'}`}>
      <div className='date'>02-13-2026</div>
      <div className='love-message'>
        Dear Zizi, 
        <br/><br/>
        I bought you plushie kasi i wanted you to have something na mahhug mo kapag namimiss mo ako or nassad ikaw. I know it can be really hard sometimes lalo na at madami kang responsibilities and humihirap na ang acads natin, dagdag pa na nagkawork kana. Gusto ko lang malaman mo na you can always come to me whenever you feel tired or helpless. Alam ko na hindi ka nagsasabi ng problem mo hanggat kaya mo pa pero i really appreciate it kapag nagllean ka sakin kahit kaunti. Ayoko nang nahihirapan at nalulungkot ka, alam mo yan. I know naman na you are a strong independent girl na, pero im still your partner so let me atleast do my part kahit na acads lang ang alam kong kaya ko ihelp. 
        <br/><br/>
        I also bought you flowers and bracelet kasi i know na you like them. I love it when you smile kasi e especially kapag nakakatanggap ka ng gifts. Makita ko lang na masaya ka, masaya na rin ako. 
        <br/><br/>
        I love you so much, zi. 
      </div>
      <div className='handwritten-sign'>yours,<br/>Maycoder</div>
    </div>
    {!openLetter &&
    <div className='unlock-container'>
        <div className='unlock'>
          <label>
            <span>Passcode</span>
            <input type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter the passcode'/>
          </label>
          <button onClick={() => password === 'ilovezizisomuch' && setOpenLetter(true)}>Unlock</button>
          <div className='password-clue'>
            password is on the qr code on your gift
          </div>
        </div>
      </div>}
    </>
  );
}

  const Dialog = () => {
    return(
      <div className={`dialog ${isShown && 'hide'}`}>
        <h1>{yes ? "ITS A DATE!!!" : messages[noCount]}</h1>
        <img src={yes ? dance : gifs[noCount]} className='gif'/>
        <div className='dialog-actions'>
          <button className='yes-btn' onClick={() => setYes(true)} style={yes ? {display: 'none'} : {}}>Sure</button>
          {noCount < 3 && <button className='no-btn' onClick={() => setNoCount(prev => prev < 3 ? prev + 1 : prev)} style={yes ? {display: 'none'} : {}}>No</button>}
          {yes && <button className='read-btn' onClick={() => setIsShown(true)}>Read your love letter</button>}
        </div>
      </div>
    );
  };

  const navigations = {
    0 : <Letter/>,
    1 : <Memories/>,
  }

  const Navigation = () => {
    return(
    <div className='navigation-bar'>
      <button onClick={() => setCurrentNav(0)}>Letter</button>
      <button onClick={() => setCurrentNav(1)}>Memories</button>
    </div>)
  }

  return(
    <>
    {isLoading && <Loading/>}
    {!isLoading && !isShown && <Dialog/>}
    {isShown && navigations[currentNav]}
    {isShown && <Navigation/>}
    </>
  );
}