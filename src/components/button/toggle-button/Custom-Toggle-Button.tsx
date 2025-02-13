import { useTranslation } from 'react-i18next';
import CustomButton from '../custom-button/Custom-Button';

import './toggle-button.css';
import { useState } from 'react';

// interface CustomToggleButtonProps {
//   isSelected?: boolean;
// }

function CustomToggleButton() {
    const { t } = useTranslation();
    const [selectStudent, setSelectStudent] = useState(true);
    const [selectTeacher, setSelectTeacher] = useState(false);
    const handleSelected = () => {
        if (selectStudent === true) {
            setSelectStudent(false);
            setSelectTeacher(true);
        } else {
            setSelectStudent(true);
            setSelectTeacher(false);
        }
    };

    return (
        <>
            <span className="toggle-btn-label">{t('auth.inputLabel.role')}</span>
            <span className="required-asterisk"> *</span>
            <div className="toggle-btn-container">
                <CustomButton
                    title={t('auth.buttonTitle.student')}
                    color={selectStudent ? 'white' : '#0339a6'}
                    backgroundColor={selectStudent ? '#001568' : 'transparent'}
                    onClick={handleSelected}
                />
                <CustomButton
                    title={t('auth.buttonTitle.teacher')}
                    color={selectTeacher ? 'white' : '#0339a6'}
                    backgroundColor={selectTeacher ? '#001568' : 'transparent'}
                    onClick={handleSelected}
                />
            </div>
        </>
    );
}

export default CustomToggleButton;
