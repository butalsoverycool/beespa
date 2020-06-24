import { bee } from '@material-ui/icons';

import beeIcon from '../../public/bee_icon.png';

// core components
import InfoArea from 'components/InfoArea/InfoArea.js';

const Intro = ({ title, text }) => {
	return <InfoArea title={title} description={text} />;
};

export default Intro;
