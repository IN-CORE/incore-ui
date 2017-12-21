//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.datacollection;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import Metadata.Specifications.DDI.LifeCycle.reusable.LabelType;


/**
 * Provide a label to be included inside of a grid cell and defines the cell or cells that contain it.
 * <p>
 * <p>Java class for CellLabelType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="CellLabelType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;extension base="{ddi:reusable:3_2}LabelType"&gt;
 *       &lt;sequence&gt;
 *         &lt;element ref="{ddi:datacollection:3_2}GridAttachment" maxOccurs="unbounded" minOccurs="0"/&gt;
 *       &lt;/sequence&gt;
 *     &lt;/extension&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "CellLabelType", propOrder = {
        "gridAttachment"
})
public class CellLabelType
        extends LabelType {

    @XmlElement(name = "GridAttachment")
    protected List<GridAttachmentType> gridAttachment;

    /**
     * Identifies the cell or cells in a grid to which the label is attached by a reference to a specific cell coordinate in a grid or by identifying a range of values along a dimension.Gets the value of the gridAttachment property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the gridAttachment property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getGridAttachment().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link GridAttachmentType }
     */
    public List<GridAttachmentType> getGridAttachment() {
        if (gridAttachment == null) {
            gridAttachment = new ArrayList<GridAttachmentType>();
        }
        return this.gridAttachment;
    }

}