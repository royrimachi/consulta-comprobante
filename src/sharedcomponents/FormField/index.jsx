// Dependencies
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// Resources
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import { InputMask } from 'primereact/inputmask';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Message } from 'primereact/message';
import styles from './styles.module.css';

const FormField = ({
  className,
  disabled,
  errors,
  errorMessage,
  handleBlur,
  handleChange,
  keyfilter,
  label,
  mask,
  maxLength,
  name,
  options,
  suggestions,
  type,
  value,
}) => {
  const [filteredSuggs, setFilteredSuggs] = useState([]);

  const suggestBrands = async (event) => {
    const results = suggestions.filter((brand) => brand.toLowerCase()
      .includes(event.query.toLowerCase()));

    setFilteredSuggs(results);
  };

  function selector() {
    switch (type) {
      case 'autoComplete':
        return (
          <>
            <label htmlFor={name}>
              <p className="form__field-label">{label}</p>
              <span>
                <AutoComplete
                  className={classNames(
                    'form__field',
                    {
                      'p-error': errors,
                    },
                  )}
                  disabled={disabled}
                  placeholder={label}
                  name={name}
                  value={value}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  suggestions={filteredSuggs}
                  completeMethod={suggestBrands}
                />
              </span>
            </label>
          </>
        );
      case 'date':
        return (
          <>
            <label htmlFor={name}>
              <p className="form__field-label">{label}</p>
              <span>
                <InputText
                  aria-label={label}
                  className={classNames(
                    'form__field',
                    {
                      'p-error': errors,
                    },
                  )}
                  disabled={disabled}
                  id={name}
                  name={name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type={type}
                  value={value}
                />
              </span>
            </label>
          </>
        );
      case 'select':
        return (
          <>
            <span>
              <label htmlFor={name}>
                <p className="form__field-label">
                  {label}
                </p>
                <Dropdown
                  className={classNames(
                    'form__field',
                    {
                      'p-error': errors,
                    },
                  )}
                  disabled={disabled}
                  id={name}
                  name={name}
                  value={value}
                  options={options}
                  onChange={handleChange}
                  placeholder={label}
                />
              </label>
            </span>
          </>
        );
      case 'mask':
        return (
          <>
            <span className="p-float-label">
              <InputMask
                autoComplete="off"
                className={classNames(
                  'form__field',
                  {
                    'p-error': errors,
                  },
                )}
                disabled={disabled}
                id={name}
                mask={mask}
                name={name}
                onBlur={handleBlur}
                onChange={handleChange}
                type={type}
                value={value}
              />
              <label htmlFor={name}>{label}</label>
            </span>
          </>
        );
      case 'textarea':
        return (
          <>
            <span>
              <label htmlFor={name}>{label}</label>
              <InputTextarea
                className={classNames(
                  'form__field',
                  {
                    'p-error': errors,
                  },
                )}
                name={name}
                onChange={handleChange}
                rows={3}
                value={value}
              />
            </span>
          </>
        );
      default:
        return (
          <>
            <span className="p-float-label">
              <InputText
                autoComplete="off"
                className={classNames(
                  'form__field',
                  {
                    'p-error': errors,
                  },
                )}
                disabled={handleChange === null ? true : disabled}
                id={name}
                keyfilter={keyfilter && keyfilter}
                maxLength={maxLength && maxLength}
                name={name}
                onBlur={handleBlur}
                onChange={handleChange}
                type={type}
                value={value}
              />
              <label htmlFor={name}>{label}</label>
            </span>
          </>
        );
    }
  }

  return (
    <>
      <div
        className={classNames(
          { [className]: className },
        )}
      >
        {selector()}
        {
          errors && (
            <>
              <hr className={styles['error-hr']} />
              <Message
                className="form__field"
                severity="error"
                text={errorMessage}
              />
            </>
          )
        }
      </div>
    </>
  );
};

FormField.defaultProps = {
  className: '',
  disabled: false,
  errors: false,
  errorMessage: '',
  handleBlur: null,
  handleChange: null,
  keyfilter: '',
  label: 'input',
  mask: '',
  maxLength: '',
  name: 'input',
  options: [],
  suggestions: [],
  type: 'input',
  value: '',
};

FormField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  errors: PropTypes.bool,
  errorMessage: PropTypes.string,
  handleBlur: PropTypes.func,
  handleChange: PropTypes.func,
  keyfilter: PropTypes.string,
  label: PropTypes.string,
  mask: PropTypes.string,
  maxLength: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.objectOf),
  suggestions: PropTypes.arrayOf(PropTypes.string),
  type: PropTypes.string,
  value: PropTypes.string,
};

export default FormField;
