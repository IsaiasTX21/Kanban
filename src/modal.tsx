import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import type { Dispatch, SetStateAction } from "react";

type Show = {
  create: boolean;
  editor: boolean;
};

type Form = {
  name: string;
  message: string;
  photo?: string;
};

type ModalProps = {
  create: boolean;
  editor: boolean;
  setShow: Dispatch<SetStateAction<Show>>;
  setform: Dispatch<SetStateAction<Form>>;
edit: () => void;
  Newuser: () => void;
};

export function Modals({
  create,
  editor,
  edit,
  Newuser,
  setShow,
  setform,
}: ModalProps) {
  return (
    <>
      {/* Modal de edição */}
      <Modal
        show={editor}
        onHide={() =>
          setShow((prev) => ({
            ...prev,
            editor: false,
          }))
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Editando tarefa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            className="form-control"
            placeholder="Escreva seu primeiro nome..."
            onChange={(e) =>
              setform((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <input
            className="form-control mt-3"
            placeholder="Tarefa desejada..."
            onChange={(e) =>
              setform((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              setShow((prev) => ({
                ...prev,
                editor: false,
              }))
            }
          >
            Fechar
          </Button>

          <Button variant="primary" onClick={edit}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de criação */}
      <Modal
        show={create}
        onHide={() =>
          setShow((prev) => ({
            ...prev,
            create: false,
          }))
        }
      >
        <Modal.Header closeButton>
          <Modal.Title>Criar nova tarefa</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <input
            className="form-control"
            placeholder="Escreva seu primeiro nome..."
            onChange={(e) =>
              setform((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }
          />

          <input
            className="form-control mt-3"
            placeholder="Tarefa desejada..."
            onChange={(e) =>
              setform((prev) => ({
                ...prev,
                message: e.target.value,
              }))
            }
          />

          <label className="mt-3" htmlFor="foto">
            Selecionar imagem
          </label>

          <input
            id="foto"
            hidden
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              const reader = new FileReader();

              reader.onloadend = () => {
                setform((prev) => ({
                  ...prev,
                  photo: reader.result as string,
                }));
              };

              reader.readAsDataURL(file);
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="danger"
            onClick={() =>
              setShow((prev) => ({
                ...prev,
                create: false,
              }))
            }
          >
            Fechar
          </Button>

          <Button variant="primary" onClick={Newuser}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}