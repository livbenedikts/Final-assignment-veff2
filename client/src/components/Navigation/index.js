import { useSelector } from 'react-redux';
import './styles.scss';

const Navigation = () => {
    const session = useSelector(({session}) => session);
    return (
        <nav className='navigation'>
            <div classname='nickname'> 
            <h1>hææ libba123</h1>
            </div>

        </nav>
    )
}

export default Navigation;