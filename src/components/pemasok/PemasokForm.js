import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { FaSave, FaTrash } from "react-icons/fa";
import PemasokService from "../../services/PemasokService";

const ModelPemasok = {
  kodePemasok: "",
  namaPemasok: "",
  alamatPemasok: "",
  teleponPemasok: "",
};

const PemasokForm = ({
  handleCallback,
  variant,
  size,
  kodePemasok,
  title,
  textButton,
}) => {
  const [pemasok, setPemasok] = useState(ModelPemasok);
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setPemasok((values) => ({ ...values, [name]: value }));
  };

  const handlePemasokServiceCreate = () => {
    PemasokService.create(pemasok)
      .then((response) => {
        handleCallback(null, pemasok);
        handleClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handlePemasokServiceGet = () => {
    if (kodePemasok) {
      PemasokService.get(kodePemasok)
        .then((response) => {
          setPemasok(response.data);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  const handlePemasokServiceEdit = () => {
    PemasokService.edit(pemasok)
      .then((response) => {
        handleCallback(null, pemasok);
        handleClose();
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  useEffect(handlePemasokServiceGet, [kodePemasok]);

  return (
    <>
      <Button variant={variant} size={size} onClick={handleShow}>
        {textButton}
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="my-2">
            <Form.Label>Kode Pemasok</Form.Label>
            <Form.Control
              name="kodePemasok"
              disabled={kodePemasok ? true : false}
              type="text"
              onChange={handleInput}
              value={pemasok.kodePemasok}
              placeholder="Kode pemasok"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Nama Pemasok</Form.Label>
            <Form.Control
              name="namaPemasok"
              type="text"
              onChange={handleInput}
              value={pemasok.namaPemasok}
              placeholder="Nama pemasok"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Alamat Pemasok</Form.Label>
            <Form.Control
              name="alamatPemasok"
              type="text"
              onChange={handleInput}
              value={pemasok.alamatPemasok}
              placeholder="Alamat pemasok"
            />
          </Form.Group>
          <Form.Group className="my-2">
            <Form.Label>Telepon Pemasok</Form.Label>
            <Form.Control
              name="teleponPemasok"
              type="text"
              onChange={handleInput}
              value={pemasok.teleponPemasok}
              placeholder="Telepon pemasok"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {kodePemasok ? (
            <>
              <Button
                variant="outline-secondary"
                onClick={handlePemasokServiceCreate}>
                <FaTrash /> Hapus
              </Button>
              <Button variant="dark" onClick={handlePemasokServiceEdit}>
                <FaSave /> Simpan Perubahan
              </Button>
            </>
          ) : (
            <Button variant="dark" onClick={handlePemasokServiceCreate}>
              <FaSave /> Simpan
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PemasokForm;
