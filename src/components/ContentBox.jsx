
import './ContentBox.css';
import Header from './Header';

function ContentBox({ children }) {
  return (
    <div className="content-box">
    
      {children}
    </div>
  );
}

export default ContentBox;
