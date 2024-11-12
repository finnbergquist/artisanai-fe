import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select";
import { Button } from "@/app/components/ui/button";

interface OptionPanelProps {
  context: string;
  setContext: (value: string) => void;
  contextOptions: string[];
  handleNewChat: () => void;
}

const OptionPanel: React.FC<OptionPanelProps> = ({ context, setContext, contextOptions, handleNewChat }) => (
  <div className="flex items-center justify-between border-t p-3">
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">Context</span>
      <Select value={context} onValueChange={setContext}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select context" />
        </SelectTrigger>
        <SelectContent>
          {contextOptions.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <Button variant="outline" onClick={handleNewChat}>New Chat</Button>
  </div>
);

export default OptionPanel;