import React from 'react';
import PropTypes from 'prop-types';
import MdFullscreen from 'react-icons/lib/md/fullscreen';
import MdFullscreenExit from 'react-icons/lib/md/fullscreen-exit';
import ToolbarButton from 'rsg-components/ToolbarButton';
import getUrl from '../../utils/getUrl';

const IsolateButton = ({ name, example, isolated }) => {
	const testID = example ? `${name}-${example}-isolate-button` : `${name}-isolate-button`;

	return isolated ? (
		<ToolbarButton
			href={getUrl({ anchor: true, slug: name.toLowerCase() })}
			title="Show all components"
			dataTestID={testID}
		>
			<MdFullscreenExit />
		</ToolbarButton>
	) : (
		<ToolbarButton
			href={getUrl({ name, example, isolated: true })}
			title="Open isolated"
			dataTestID={testID}
		>
			<MdFullscreen />
		</ToolbarButton>
	);
};

IsolateButton.propTypes = {
	name: PropTypes.string.isRequired,
	example: PropTypes.number,
	isolated: PropTypes.bool,
};

export default IsolateButton;
