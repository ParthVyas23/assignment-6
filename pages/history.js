import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { Button, Card, ListGroup } from "react-bootstrap";
import styles from "@/styles/History.module.css";
import { useRouter } from "next/router";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  console.log(searchHistory);
  let parsedHistory = [];

  searchHistory.forEach((h) => {
    let params = new URLSearchParams(h);
    let entries = params.entries();

    parsedHistory.push(Object.fromEntries(entries));
  });

  function historyClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    router.push(`/artwork?${searchHistory[index]}`);
  }

  function removeHistoryClicked(e, index) {
    e.stopPropagation(); // stop the event from trigging other events
    setSearchHistory((current) => {
      let x = [...current];
      x.splice(index, 1);
      return x;
    });
  }

  return (
    <>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory?.map((historyItem, index) => (
            <ListGroup.Item
              key={index}
              onClick={(e) => historyClicked(e, index)}
              className={styles.historyListItem}
            >
              {Object.keys(historyItem).map((key) => (
                <>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for something else
          </Card.Body>
        </Card>
      )}
    </>
  );
}
