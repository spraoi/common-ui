import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import { createGlobalStyle, ThemeContext } from 'styled-components';
import Box from '../Box';
import Button from '../Button';

const StyledGlobal = createGlobalStyle`
  .ReactModal__Overlay {
    opacity: 0;
    transition: opacity 200ms ease-in-out;
    z-index: ${(p) => p.theme.zIndices[4]};
  }

  .ReactModal__Overlay--after-open{
    opacity: 1;
  }

  .ReactModal__Overlay--before-close{
    opacity: 0;
  }

  .ReactModal__Content {
    transition: transform 200ms ease-in-out;
    transform: translate(-50%, -52%);
  }

  .ReactModal__Content--after-open{
    transform: translate(-50%, -50%);
  }

  .ReactModal__Content--before-close{
    transform: translate(-50%, -52%);
  }
`;

const Modal = ({
  children,
  closeText,
  onClose,
  onSubmit,
  style,
  submitText,
  submitting,
  title,
  toolbarContent,
  ...rest
}) => {
  const theme = useContext(ThemeContext);

  return (
    <ReactModal
      ariaHideApp={false}
      closeTimeoutMS={200}
      onRequestClose={onClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      style={{
        content: {
          border: 'none',
          borderRadius: theme.radii[1],
          bottom: 'auto',
          boxShadow: theme.shadows[3],
          left: '50%',
          maxWidth: theme.sizes.maxWidths.form,
          overflow: 'visible',
          padding: 0,
          right: 'auto',
          top: '50%',
          width: `calc(100% - ${theme.space[5]} * 2`,
          ...style.content,
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          ...style.overlay,
        },
      }}
      {...rest}
    >
      <StyledGlobal />
      <Box fontSize={5} fontWeight="bold" pb={2} pt={6} px={[5, null, null, 6]}>
        {title}
      </Box>
      <Box pb={7} pt={6} px={[5, null, null, 6]}>
        {children}
      </Box>
      <Box
        sx={{
          borderColor: 'grays.2',
          borderTopStyle: 'solid',
          borderWidth: '1px',
          display: 'flex',
          justifyContent: 'flex-end',
          p: 5,
        }}
      >
        {toolbarContent || (
          <>
            {closeText && (
              <Button
                disabled={submitting}
                onClick={onClose}
                variant="buttons.cancel"
              >
                {closeText}
              </Button>
            )}
            {onSubmit && submitText && (
              <Button ml={5} onClick={onSubmit} submitting={submitting}>
                {submitText}
              </Button>
            )}
          </>
        )}
      </Box>
    </ReactModal>
  );
};

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  closeText: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  style: PropTypes.shape({
    content: PropTypes.shape({}),
    overlay: PropTypes.shape({}),
  }),
  submitText: PropTypes.string,
  submitting: PropTypes.bool,
  title: PropTypes.string,
  toolbarContent: PropTypes.node,
};

Modal.defaultProps = {
  closeText: null,
  onSubmit: null,
  style: {},
  submitText: null,
  submitting: false,
  title: null,
  toolbarContent: null,
};

export default Modal;
