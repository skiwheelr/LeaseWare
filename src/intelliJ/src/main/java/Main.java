import javafx.animation.*;
import static def.dom.Globals.alert;
import static def.jquery.Globals.$;
import java.util.ArrayList;
import java.util.List;
import def.js.Array.push;

public class Main {

    public static void main(String [] args){
        Main m = new Main();
        System.out.println("Test print from Main method.");
        m.go();

        /*// you can use regular Java API
        List<String> l = new ArrayList<>();
        l.add("Hello");
        l.add("world");
        //// and you can also use regular JavaScript APIs
        Array<String> a = new Array<>();
        a.push("Hello", "world");
        // use of jQuery with the jQuery candy
        $("#target").text(l.toString());
        // use of the JavaScript DOM API
        alert(a.toString());*/

    }

    public void go(){
        System.out.println("Test print from Main.go()");

    }
}
