import { useState } from "react";
import { useDispatch } from "react-redux";
import { addZone, deleteZone, editZone, getZones } from "../Redux/actions/zone";
import classes from "../styles/Modal.module.css";
import { Point, ZoneResponse } from "../utils/interfaces";

interface ModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  _id?: string;
  label?: string;
  color?: string;
  points?: Point[];
  actionType?: string;
}

const {
  modalBackground,
  modalContainer,
  titleCloseBtn,
  body,
  input_text,
  footer,
} = classes;

function Modal({
  setModalOpen,
  actionType,
  points,
  _id = "",
  label = "",
  color = "red",
}: ModalProps) {
  const dispatch = useDispatch();

  const [modalData, setModalData] = useState({
    modalLabel: label,
    modalColor: color,
  });

  const { modalLabel, modalColor } = modalData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setModalData({ ...modalData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (actionType === "add") {
      dispatch(
        addZone({
          label: modalLabel,
          color: modalColor,
          points,
        } as ZoneResponse)
      );
    } else if (actionType === "edit") {
      dispatch(
        editZone({
          _id,
          label: modalLabel,
          color: modalColor,
          points,
        } as ZoneResponse)
      );
    } else if (actionType === "delete") {
      dispatch(deleteZone(_id as string));
    }
    setModalOpen(false);
    dispatch(getZones());
  };

  return (
    <>
      <div className={modalBackground} onClick={() => setModalOpen(false)} />
      <div className={modalContainer}>
        <div className={titleCloseBtn}>
          <button type="button" onClick={() => setModalOpen(false)}>
            X
          </button>
        </div>

        <div className={body}>
          {actionType === "delete" && <p>Are you sure ?</p>}

          {actionType === "add" || actionType === "edit" ? (
            <>
              <div>
                <label htmlFor="Label">Please Enter a zone name </label>
                <input
                  className={input_text}
                  type="text"
                  width="30px"
                  name="modalLabel"
                  value={modalLabel}
                  onChange={(e) => onChange(e)}
                  required
                  minLength={3}
                />
              </div>
              <div>
                <label htmlFor="color">Please Choose a color </label>
                <input
                  width="30px"
                  type="color"
                  name="modalColor"
                  value={modalColor}
                  onChange={(e) => onChange(e)}
                />
              </div>
            </>
          ) : null}
        </div>
        <div className={footer}>
          <button type="button" onClick={(e: any) => onSubmit(e)}>
            Ok
          </button>
          <button
            type="button"
            onClick={() => {
              setModalOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default Modal;
