
import javafx.application.Application;
import javafx.geometry.HPos;
import javafx.geometry.Insets;
import javafx.geometry.Orientation;
import javafx.geometry.Pos;
import javafx.scene.Group;
import javafx.scene.control.Label;
import javafx.scene.control.PasswordField;
import javafx.scene.control.TextField;
import javafx.scene.image.Image;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.scene.Scene;
import javafx.scene.control.Button;

import javax.swing.text.html.ImageView;
import java.lang.reflect.InvocationTargetException;

public class GuiDeck extends Application {


    @Override
    public void start(Stage primaryStage) throws InvocationTargetException {

       /* //Create Border Pane
        BorderPane border = new BorderPane();

        //Add GridPane
        GridPane grid = addGridPane();
        border.setTop(grid);

        //Add Bottom HBox
        HBox bottomHBox = addBottomHBox();
        border.setBottom(bottomHBox);
*/

        TextField plate = new TextField();
        TextField vin = new TextField();
        TextField model = new TextField();

        Button enter = new Button();
        enter.setText("Enter Vehicle");
        enter.setOnAction(new EventHandler<ActionEvent>() {
                @Override
                public void handle(ActionEvent event) {
                    //Add code to enter vehicle to vehicles micro-service database.
                    System.out.println("Vehicle Registered");
                   //Print VR to visible screen.
                 }
        });

        Button exit = new Button();
        exit.setText("Quit myFleet");

        exit.setOnAction(new EventHandler<ActionEvent>() {
            @Override
            public void handle(ActionEvent event) {
                primaryStage.close();
            }
        });

        // HBox hb = new HBox();
        FlowPane fp = addFlowPane(Orientation.HORIZONTAL,20,20);
        //StackPane root = new StackPane();
        //BorderPane root = new BorderPane();
        Group input = new Group(plate, vin, model, enter, exit);

        // root.getChildren().add(btn);
        //root.getChildren().addAll(enter);
        //root.getChildren().add(input);
        //root.setLeft(input);
         fp.getChildren().add(input);

        GridPane grid = new GridPane();
        grid.setHgap(10);
        grid.setVgap(12);

        HBox hbButtons = new HBox();
        hbButtons.setSpacing(10.0);

        Button btnSubmit = new Button("Submit");
        Button btnClear = new Button("Clear");
        Button btnExit = new Button("Exit");
        btnSubmit.setStyle("-fx-font-size: 15pt;");

        Label lblName = new Label("User name:");
        TextField tfName = new TextField();
        Label lblPwd = new Label("Password:");
        PasswordField pfPwd = new PasswordField();

        hbButtons.getChildren().addAll(btnSubmit, btnClear, btnExit);
        grid.add(lblName, 0, 0);
        grid.add(tfName, 1, 0);
        grid.add(lblPwd, 0, 1);
        grid.add(pfPwd, 1, 1);
        grid.add(hbButtons, 0, 2, 2, 1);

        //root.getChildren().add(input);
        //root.setAlignment(Pos.CENTER_RIGHT);
        //hb.getChildren().add(root);
        //root.getChildren().add(enter,exit);
        //root.getChildren().addAll(plate, vin, model);
        //root.setAlignment(plate, Pos.BASELINE_LEFT);
        //root.setAlignment(vin,Pos.TOP_LEFT);
        //root.setAlignment(enter,Pos.CENTER);
        //plate.setLayoutX(400);
        //root.setLayoutY(200);
        Group layout = new Group();
        layout.getChildren().addAll(grid,fp);

        Scene scene = new Scene(layout, 700, 650);
        primaryStage.setTitle("myFleet");
        primaryStage.setScene(scene);
        primaryStage.show();
    }


    public static void main(String[] args) {
        launch(args);
    }

    public FlowPane addFlowPane(Orientation o, double hgap, double vgap) {
        FlowPane flow = new FlowPane();
        flow.setPadding(new Insets(5, 0, 5, 0));
        flow.setVgap(4);
        flow.setHgap(4);
        flow.setPrefWrapLength(170); // preferred width allows for two columns
        flow.setStyle("-fx-background-color: DAE6F3;");
        return flow;
    }
}



