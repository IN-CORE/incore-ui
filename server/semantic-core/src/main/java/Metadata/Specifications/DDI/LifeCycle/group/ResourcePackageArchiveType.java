//
// This file was generated by the JavaTM Architecture for XML Binding(JAXB) Reference Implementation, v2.2.11 
// See <a href="http://java.sun.com/xml/jaxb">http://java.sun.com/xml/jaxb</a> 
// Any modifications to this file will be lost upon recompilation of the source schema. 
// Generated on: 2017.01.04 at 03:10:13 PM CST 
//


package Metadata.Specifications.DDI.LifeCycle.group;

import java.util.ArrayList;
import java.util.List;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlElements;
import javax.xml.bind.annotation.XmlType;

import Metadata.Specifications.DDI.LifeCycle.archive.ArchiveType;
import Metadata.Specifications.DDI.LifeCycle.reusable.ReferenceType;


/**
 * This is archive information specific to the creation, maintenance, and archiving of the ResourcePackage provided either in-line or by reference. This packaging element differentiates this "Archive" from one being published as a product within a ResourcePackage.
 * <p>
 * <p>Java class for ResourcePackageArchiveType complex type.
 * <p>
 * <p>The following schema fragment specifies the expected content contained within this class.
 * <p>
 * <pre>
 * &lt;complexType name="ResourcePackageArchiveType"&gt;
 *   &lt;complexContent&gt;
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType"&gt;
 *       &lt;sequence&gt;
 *         &lt;choice maxOccurs="unbounded" minOccurs="0"&gt;
 *           &lt;element ref="{ddi:archive:3_2}Archive"/&gt;
 *           &lt;element ref="{ddi:reusable:3_2}ArchiveReference"/&gt;
 *         &lt;/choice&gt;
 *       &lt;/sequence&gt;
 *     &lt;/restriction&gt;
 *   &lt;/complexContent&gt;
 * &lt;/complexType&gt;
 * </pre>
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ResourcePackageArchiveType", propOrder = {
        "archiveOrArchiveReference"
})
public class ResourcePackageArchiveType {

    @XmlElements({
            @XmlElement(name = "Archive", namespace = "ddi:archive:3_2", type = ArchiveType.class),
            @XmlElement(name = "ArchiveReference", namespace = "ddi:reusable:3_2", type = ReferenceType.class)
    })
    protected List<Object> archiveOrArchiveReference;

    /**
     * Gets the value of the archiveOrArchiveReference property.
     * <p>
     * <p>
     * This accessor method returns a reference to the live list,
     * not a snapshot. Therefore any modification you make to the
     * returned list will be present inside the JAXB object.
     * This is why there is not a <CODE>set</CODE> method for the archiveOrArchiveReference property.
     * <p>
     * <p>
     * For example, to add a new item, do as follows:
     * <pre>
     *    getArchiveOrArchiveReference().add(newItem);
     * </pre>
     * <p>
     * <p>
     * <p>
     * Objects of the following type(s) are allowed in the list
     * {@link ArchiveType }
     * {@link ReferenceType }
     */
    public List<Object> getArchiveOrArchiveReference() {
        if (archiveOrArchiveReference == null) {
            archiveOrArchiveReference = new ArrayList<Object>();
        }
        return this.archiveOrArchiveReference;
    }

}