import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Modal } from '@mantine/core';

import { useUserStore } from '../../../entities';
import { SharedUi } from '../../../shared';
import { SuccesfullContent } from './SuccesfulContent';
import { FailedContent } from './FailedContent';

export const AccountActivation = () => {
    const { activate, isActivated,isAnotherAccountActivated, isLoading } = useUserStore();

    const { activationLink } = useParams();

    useEffect(() => {
        if (!isActivated && activationLink) {
            activate(activationLink);
        }
    }, []);


    return (
        (<Modal onClose={() => { }} opened={true} withCloseButton={false}>
            {isLoading
                ? <SharedUi.CenterLoader />
                : isActivated || isAnotherAccountActivated
                    ? <SuccesfullContent />
                    : <FailedContent />}
        </Modal>)
    );
};
