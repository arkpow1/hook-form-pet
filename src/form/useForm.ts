import React from "react";

const useForm = () => {
  const inputRefs = React.useRef({});
  const formDataRef = React.useRef({});

  const watchRef = React.useRef({});

  const [, setChangeState] = React.useState(false);

  const makeListener = (element) => {
    const inputs = {
      INPUT: true,
      TEXTAREA: true,
    };

    if (inputs[element.tagName]) {
      element.addEventListener("input", (e) => {
        if (watchRef.current[e.target.name]) {
          setChangeState((prev) => !prev);
          delete watchRef.current[e.target.name];
        }

        formDataRef.current[element.name] = e.target.value;
      });
    } else {
      formDataRef.current[element.name] = element.value;

      element.addEventListener("change", (e) => {
        if (watchRef.current[e.target.name]) {
          setChangeState((prev) => !prev);
          delete watchRef.current[e.target.name];
        }

        formDataRef.current[element.name] = e.target.value;
      });
    }
  };

  const register = (name) => {
    const hasProperty = inputRefs.current[name];
    inputRefs.current[name] = hasProperty
      ? inputRefs.current[name]
      : { current: null };

    setTimeout(() => {
      !hasProperty && makeListener(inputRefs.current[name].current);
    }, 0);
    return { name, ref: inputRefs.current[name] };
  };

  const watch = (arg?) => {
    if (typeof arg === "string") {
      watchRef.current[arg] = true;

      return formDataRef.current[arg];
    }
    if (typeof arg === "undefined") {
      Object.keys(formDataRef.current).forEach((item) => {
        watchRef.current[item] = true;
        return watchRef.current;
      });
    }
    if (Array.isArray(arg)) {
      return arg.reduce((acc, name) => {
        watchRef.current[name] = true;
        acc[name] = formDataRef.current[name];

        return acc;
      }, {});
    }
  };

  const setValue = (name, value) => {
    inputRefs.current[name].current.value = value;
    formDataRef.current[name] = value;
    if (watchRef.current[name]) {
      setChangeState((prev) => !prev);
      delete watchRef.current[name];
    }
  };

  const setFocus = (name) => {
    inputRefs.current[name].current.focus();
  };

  const reset = (arg?) => {
    Object.values(inputRefs.current).forEach((element: any) => {
      const newValue =
        arg && arg[element.current.name] ? arg[element.current.name] : null;

      element.current.value = newValue;
      formDataRef.current[element.current.name] = newValue;
      
      if (watchRef.current[element.current.name]) {
        setChangeState((prev) => !prev);
        delete watchRef.current[element.current.name];
      }
    });
  };

  const handleSubmit = (callback) => {
    return {
      onSubmit: (e) => {
        e.preventDefault();
        callback(formDataRef.current);
      },
    };
  };

  return { register, watch, handleSubmit, setValue, setFocus, reset };
};

export default useForm;
