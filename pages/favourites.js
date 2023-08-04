import ArtworkCard from "@/components/ArtworkCard";
import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { Card, Col, Row } from "react-bootstrap";

export default function FavouriteList() {
  const [favouritesList] = useAtom(favouritesAtom);

  return (
    <Row className="gy-4">
      {favouritesList?.length > 0 ? (
        favouritesList.map((id) => (
          <Col lg={3} key={id}>
            <ArtworkCard objectID={id} />
          </Col>
        ))
      ) : (
        <Card>
          <Card.Body>
            <h4>Nothing Here</h4>
            Try searching for something else
          </Card.Body>
        </Card>
      )}
    </Row>
  );
}
