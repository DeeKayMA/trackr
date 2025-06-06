import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

export const QuoteCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Motivation</CardTitle>
        <CardDescription>A reminder to keep going</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-medium text-md italic">"A winner is a dreamer who never gives up"</p>
        
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">Nelson Mandela</p>
      </CardFooter>
    </Card>
  );
};
